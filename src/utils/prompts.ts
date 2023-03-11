interface PromptContent {
  option: string
  value: string
}

const promptArr: PromptContent[] = [
  {
    option: '编日报',
    value: '帮我写个工作的日报，内容+列表的形式',
  },
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
  {
    option: '英文翻译',
    value: '翻译成简体中文',
  },
]

export default promptArr
