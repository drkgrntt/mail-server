import path from 'path'
import fs from 'fs'

export const parseEmail = (
  template: string,
  variables: Record<string, string>
) => {
  const html = fs
    .readFileSync(path.join('emails', template + '.html'))
    ?.toString()
  if (!html) return ''

  const parsedHtml = Object.keys(variables).reduce(
    (currentHtml, key) => {
      const value = variables[key]
      return currentHtml.replace('{{' + key + '}}', value)
    },
    html
  )

  return parsedHtml
}
