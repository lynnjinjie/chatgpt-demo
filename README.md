# ChatGPT Demo
> a demo repo based on [OpenAI GPT-3.5 Turbo API](https://platform.openai.com/docs/guides/chat)

## Running Locally

### Pre environment
1. Node
```bash
node -v
```
2. PNPM
```bash
npm i -g pnpm
```

### Getting Started
1. Install dependencies
```bash
pnpm install
```
2. Copy the `.env.example` file, then rename it to `.env`, and add your [OpenAI API key](https://platform.openai.com/account/api-keys)to the `.env` file.
3. Run the application, the local project runs on `http://localhost:3000`.
```bash
pnpm run dev
```

### Deploy With Netlify
[Example](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/) of how to deploy, don't forget to configure [environment variables](https://docs.netlify.com/environment-variables/overview/)
