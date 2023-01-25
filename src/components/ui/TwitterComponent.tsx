import classNames from 'classnames';
import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import TweetEmbed from 'react-tweet-embed';

import Loader from './Loader';

const useStyles = createUseStyles({
  twitter: {
    width: '100%',
    maxWidth: 450,
    display: 'block',
    '.twitter-widget-0': {
      width: '200px !important',
    },
  },
});

interface ITwitterComponent {
  id: string;
  options?: any;
  className?: string;
  [key: string]: any;
}

export const TwitterComponent = ({
  options,
  className,
  id,
  ...rest
}: ITwitterComponent) => {
  const classes = useStyles();
  const [twitterLoading, setTwitterLoading] = useState(true);

  return (
    <>
      {twitterLoading && <Loader />}
      <TweetEmbed
        className={classNames(classes.twitter, className)}
        tweetId={id}
        options={{ conversation: 'none', ...options }}
        onTweetLoadSuccess={() => setTwitterLoading(false)}
        {...rest}
      />
    </>
  );
};

export default TwitterComponent;
