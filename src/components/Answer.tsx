import { Button, Card, CardBody, Text, useClipboard, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'

interface AnswerType {
  content: string
}

export default function Answer({ content }: AnswerType) {
  const { onCopy, value, setValue, hasCopied } = useClipboard('')
  const toast = useToast()

  useEffect(() => {
    setValue(content)
  }, [content])

  useEffect(() => {
    hasCopied && toast({
      description: 'Copied!',
      status: 'success',
      duration: 1000,
    })
  }, [hasCopied])

  return (
    <Card>
      <CardBody className='relative pt-2'>
        {
          content
          && <Button
            className='!absolute top-1 right-3'
            size='xs'
            colorScheme='purple'
            onClick={onCopy}
          >COPY</Button>
        }
        <Text textAlign="left">{content}</Text>
      </CardBody>
    </Card>
  )
}
