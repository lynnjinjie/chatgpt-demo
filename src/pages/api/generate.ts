import type { NextRequest } from 'next/server'
import type { OpenAIStreamPayload } from '~/utils/OpenAIStream'
import { OpenAIStream } from '~/utils/OpenAIStream'

if (!process.env.OPENAI_API_KEY)
  throw new Error('Missing env var from OpenAI')

export const config = {
  runtime: 'edge',
}

const handler = async (req: NextRequest): Promise<Response> => {
  const { prompt } = (await req.json()) as {
    prompt?: string
  }

  if (!prompt)
    return new Response('No prompt in the request', { status: 400 })

  const payload: OpenAIStreamPayload = {
    // model:"text-chat-davinci-002-20221122",
    // model: "text-davinci-003",
    // model:"text-curie-001",
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    // prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 800,
    stream: true,
    n: 1,
  }
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })

  const stream = await OpenAIStream(res)
  return new Response(stream)
}

export default handler
