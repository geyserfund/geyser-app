import React from 'react';
import { Global } from '@emotion/react';

export const Fonts = () => (
	<Global
		styles={`
        @font-face {
            font-family: 'Myanmar-Khyay';
            src:url('/Myanmar-Khyay.ttf.woff') format('woff'),
                url('/Myanmar-Khyay.ttf.svg#Myanmar-Khyay') format('svg'),
                url('/Myanmar-Khyay.ttf.eot'),
                url('/Myanmar-Khyay.ttf.eot?#iefix') format('embedded-opentype'); 
            font-weight: 400;
            font-style: normal;
            font-display: swap;
        }
      `}
	/>
);
