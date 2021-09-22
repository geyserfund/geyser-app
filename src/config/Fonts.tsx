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
        /* custom scrollbar */
        ::-webkit-scrollbar {
        width: 20px;
        }

        ::-webkit-scrollbar-track {
        background-color: transparent;
        }

        ::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
        }

        ::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
        }
      `}
	/>
);
