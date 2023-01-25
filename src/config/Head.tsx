import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router';

import {
  DefaultMetaDescription,
  DefaultMetaImage,
  DefaultMetaTitle,
  DefaultMetaTwitterCard,
  DefaultMetaTwitterSite,
  DefaultMetaType,
} from '../constants';
type HeadProps = {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  children?: React.ReactNode;
};

export const Head: React.FC<HeadProps> = (tags) => {
  const {
    title = DefaultMetaTitle,
    description = DefaultMetaDescription,
    image = DefaultMetaImage,
    type = DefaultMetaType,
    children,
  } = tags;
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
      <meta property="twitter:card" content={DefaultMetaTwitterCard} />
      <meta property="twitter:site" content={DefaultMetaTwitterSite} />
      {children}
    </Helmet>
  );
};
