import React from 'react';
import { Global } from '@emotion/react';

export const GlobalStyles = () => (
	<Global
		styles={`
        @import url('https://fonts.googleapis.com/css2?family=Solway:wght@300;400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');
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

        button:focus {
            box-shadow: none !important;
        }

        ::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
        }
      `}
	/>
);
