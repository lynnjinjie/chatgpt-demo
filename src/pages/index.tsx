import { useMemo, useState } from 'react'
import { Button, Select, Textarea, useColorMode, useToast } from '@chakra-ui/react'

import Footer from '~/components/Footer'
import Answer from '~/components/Answer'

import prompts from '~/utils/prompts'

export default function Home() {
  const [describe, setDescribe] = useState('')
  const [prompt, setPrompt] = useState('')
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()

  const convertion = useMemo(() => `${prompt}:\n ${describe}`, [describe, prompt])

  async function handleClick() {
    if (!describe) {
      toast({
        status: 'warning',
        description: 'please type something!',
      })
      return
    }

    setAnswer('')
    setIsLoading(true)
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: convertion,
      }),
    })
    if (!response.ok) {
      setIsLoading(false)
      throw new Error(response.statusText)
    }

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

  function handleSelect(value: string) {
    setPrompt(value)
  }

  return (
    <div className={`text-center max-w-5xl mx-auto mt-4 p-2 min-h-screen ${colorMode === 'dark' ? 'dark' : ''}`}>
      <main className='max-w-2xl mx-auto'>
      <div className='py-2 flex justify-between items-center'>
        <h2 className='h2'>ChatGPT Demo</h2>
        <div
          className='dark:i-carbon-sun i-carbon-moon cursor-pointer'
          onClick={toggleColorMode}
        ></div>
      </div>
      <Textarea
        placeholder='e.g. hello world'
        size="lg"
        value={describe}
        onChange={e => setDescribe(e.target.value)}
      ></Textarea>
      <h2 className='h2'>Advance Prompt</h2>
      <Select placeholder='直接问ChatGPT' onChange={e => handleSelect(e.target.value)}>
        {
          prompts.map(prompt => <option value={prompt.value} key={ prompt.option }>{prompt.option}</option>)
        }
      </Select>
      <Button
        isLoading={isLoading}
        loadingText='Loading'
        className='w-full my-4'
        colorScheme='teal'
        onClick={() => handleClick()}
      >submit</Button>
      {
        answer
        && <Answer content={answer}></Answer>
      }
      </main>
      <Footer></Footer>
    </div>
  )
}
