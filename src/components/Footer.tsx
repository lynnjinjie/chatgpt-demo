import { Divider, Link } from '@chakra-ui/react'

export default function Footer() {
  const powerby = [
    {
      href: 'https://beta.openai.com/account',
      name: 'OpenAI',
    },
    {
      href: 'https://netlify.app/',
      name: 'Netlify',
    },
    {
      href: 'https://nextjs.or',
      name: 'Next.js',
    },
  ]

  return (
    <footer className='mt-5'>
      <Divider></Divider>
      <div className='h-16 flex justify-between pt-2'>
        <div>
          Powered by{' '}
          {
            powerby.map((link, i) => {
              return (
                <span key={link.href}>
                  <Link
                    color='teal.500'
                    target="_blank"
                    rel="noreferrer"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                  {i !== powerby.length - 1 && ' + '}
                </span>
              )
            })
          }
        </div>
        <div>
            <Link href='https://github.com/lynnjinjie/chatgpt-demo'>
              <div className='i-carbon:logo-github'></div>
            </Link>
        </div>
      </div>
    </footer>
  )
}
