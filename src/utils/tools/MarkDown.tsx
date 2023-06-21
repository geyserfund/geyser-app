import classNames from 'classnames'
import { createUseStyles } from 'react-jss'
import ReactMarkdown from 'react-markdown'
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown'

interface MarkDownProps extends ReactMarkdownOptions {
  color?: string
  wordBreak?: string
  fontSize?: any
}

type Rules = string

type StyleProps = {
  color?: string
  wordBreak?: string
  fontSize?: any
}

const useStyles = createUseStyles<Rules, StyleProps>({
  container: ({ color, wordBreak, fontSize }) => ({
    color: color || 'inherit',
    wordBreak: wordBreak || 'break-word',
    fontSize,
    '& a': {
      textDecoration: 'underline',
    },
    '& ul': {
      paddingLeft: '20px',
    },
    '& ol': {
      paddingLeft: '20px',
    },
  }),
})

export const MarkDown = ({
  children,
  className,
  color,
  wordBreak,
  fontSize,
  ...rest
}: MarkDownProps) => {
  const classes = useStyles({ color, wordBreak, fontSize })

  const finalValue = formatString(children)

  return (
    <ReactMarkdown
      className={classNames(classes.container, className)}
      components={{
        a: ({ node, ...props }) => (
          <a {...props} target="_blank" referrerPolicy="no-referrer" />
        ),
      }}
      {...rest}
    >
      {finalValue}
    </ReactMarkdown>
  )
}

const formatString = (value: string): string => {
  const adjustForLineChange = value
    ? value.replaceAll(/\n/g, '&nbsp;  \n\n')
    : ''
  return adjustForLineChange
}
