import classNames from 'classnames';
import React from 'react';
import { createUseStyles } from 'react-jss';
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';

interface MarkDownProps extends ReactMarkdownOptions {}

const useStyles = createUseStyles({
  container: {
    '& a': {
      textDecoration: 'underline',
    },
    '& ul': {
      paddingLeft: '25px',
    },
    '& ol': {
      paddingLeft: '25px',
    },
  },
});

export const MarkDown = ({ children, className, ...rest }: MarkDownProps) => {
  const classes = useStyles();
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
      {children}
    </ReactMarkdown>
  );
};
