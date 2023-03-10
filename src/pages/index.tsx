import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '~/styles/Home.module.css'
import { useState } from 'react'


export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [answer, setAnswer] = useState('')
  async function handleClick() {

    setAnswer('')

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      })
    })
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setAnswer((prev) => prev + chunkValue);
    }
  }

  return (
    <div>
      <div>index</div>
      <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="write someting" />
      <button onClick={() => handleClick()}>submit</button>
      <p>{answer}</p>
    </div>
  )
}
