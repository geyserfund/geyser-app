import React from 'react';
import { createUseStyles } from 'react-jss';
import YouTube, { YouTubeProps } from 'react-youtube';

interface IYoutubeEmbed {
  videoId: string;
}

const useStyles = createUseStyles({
  youtubeContainer: {
    width: '100%',
    borderRadius: '4px',
    overflow: 'hidden',
  },
});

export const YoutubeEmbed = ({ videoId }: IYoutubeEmbed) => {
  const classes = useStyles();

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // Access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <YouTube
      className={classes.youtubeContainer}
      videoId={videoId}
      opts={opts}
      onReady={onPlayerReady}
    />
  );
};
