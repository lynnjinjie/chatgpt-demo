import { Card, CardBody } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import type { CodeProps } from 'react-markdown/lib/ast-to-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import CopyBtn from '~/components/CopyBtn'

interface Props {
  content: string
}

export default function Answer({ content }: Props) {
  const formatMdCopyData = (children: any) => {
    return children[0].props.children[0]
  }

  const Pre = ({ children }: any) => (
    <pre className='relative'>
      <CopyBtn content={formatMdCopyData(children)}></CopyBtn>
      {children}
    </pre>
  )

  return (
    <Card>
      <CardBody className='relative pt-2'>
        <div className='text-left list-inside'>
          <ReactMarkdown
            children={content}
            components={{
              pre: Pre,
              code({ node, inline, className, children, style, ...props }: CodeProps) {
                const match = /language-(\w+)/.exec(className || '') || 'shell'
                return (!inline && match)
                  ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    showLineNumbers={true}
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                    )
                  : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                    )
              },
            }}
          />
        </div>
      </CardBody>
    </Card>
  )
}
