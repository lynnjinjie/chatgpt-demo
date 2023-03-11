import { useClipboard, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'

interface Props {
  content: string
}

export default function CopyBtn({ content }: Props) {
  const { onCopy, value, setValue, hasCopied } = useClipboard('')
  const toast = useToast()
  // resolve useClipboard bug -> https://github.com/chakra-ui/chakra-ui/issues/6759
  useEffect(() => {
    setValue(content)
  }, [content])

  useEffect(() => {
    hasCopied && toast({
      description: 'Copied!',
      status: 'success',
      duration: 1000,
      position: 'top',
    })
  }, [hasCopied])

  return (
    <div
      className='!absolute top-1 right-2 i-carbon:copy-file cursor-pointer'
      onClick={onCopy}
    ></div>
  )
}
