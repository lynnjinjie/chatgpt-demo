import { useState } from 'react'
import { Button, Card, CardBody, Select, Text, Textarea } from '@chakra-ui/react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleClick() {
    setAnswer('')
    setIsLoading(true)
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    })
    if (!response.ok)
      throw new Error(response.statusText)

    // This data is a ReadableStream
    const data = response.body
    if (!data)
      return

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)
      setAnswer(prev => prev + chunkValue)
    }
    setIsLoading(false)
  }

  const promptArr = [
    {
      option: '英文邮件',
      value: 'Generate a business email in UK English that is friendly, but still professional and appropriate for the workplace.The topic is',
    },
    {
      option: '中文邮件',
      value: 'Generate a business email in Simplified Chinese  that is friendly, but still professional and appropriate for the workplace.The topic is',
    },
    {
      option: '总结内容',
      value: '用一段话详略得当总结这段聊天内容',
    },
  ]

  // const promptObj = {
  //   英文邮件: 'Generate a business email in UK English that is friendly, but still professional and appropriate for the workplace.The topic is',
  //   中文邮件: 'Generate a business email in Simplified Chinese  that is friendly, but still professional and appropriate for the workplace.The topic is',
  //   说了啥: '用一段话详略得当总结这段聊天内容',
  // }

  return (
    <div className='text-center max-w-5xl mx-auto flex-col mt-4 p-2 min-h-screen'>
      <h2 className='h2'>ChatGPT Demo</h2>
      <Textarea
        placeholder='writing some thing'
        size="lg"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      ></Textarea>
      <h2 className='h2'>常用prompt</h2>
      <Select placeholder='选择一个prompt'>
        {
          promptArr.map(prompt => <option value={prompt.value} key={ prompt.option }>{prompt.option}</option>)
        }
      </Select>
      <Button
        isLoading={isLoading}
        loadingText='Loading'
        className='w-full my-4'
        colorScheme='pink'
        onClick={() => handleClick()}
      >submit</Button>
      {
        answer
        && (<Card>
        <CardBody>
          <Text textAlign="left">{answer}</Text>
        </CardBody>
      </Card>)
      }
    </div>
  )
}
