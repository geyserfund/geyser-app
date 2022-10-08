import * as React from 'react';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet';

type HeadProps = {
  title: string;
  description?: string;
  image?: string;
  type?: string;
  children?: React.ReactNode;
};

export const Head: React.FC<HeadProps> = ({
  title,
  description,
  image,
  type = 'website',
  children,
}) => {
  const location = useLocation();
  return (
    <Helmet>
      <title>{title} | Geyser</title>
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {description && <meta property="description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      <meta
        property="og:url"
        content={`${window.location.protocol}//${window.location.host}${location.pathname}`}
      />
      <meta property="og:type" content={type} />
      {children}
    </Helmet>
  );
};
