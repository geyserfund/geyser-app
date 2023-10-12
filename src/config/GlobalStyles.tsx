import { Global } from '@emotion/react'

import { darkModeColors, lightModeColors } from '../styles'

export const GlobalStyles = () => (
  <Global
    styles={`
        @import url('https://fonts.googleapis.com/css2?family=Solway:wght@300;400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap');
		    @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Livvic:wght@400;500;600;700&display=swap');
        
        @font-face {
            font-family: 'Inter', sans-serif;
            font-weight: 400;
            font-style: normal;
            font-display: swap;
        }


        ::-webkit-scrollbar {
            width: 8px;
            height: 5px;
          }

          ::-webkit-scrollbar-thumb {
            background: rgba(90, 90, 90,0.2);
          }

          ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
          }

        button:focus {
            box-shadow: none !important;
        }

        ::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
        }
        body {
            overflow: overlay;
        }
        
        .chakra-ui-dark {
            background: ${darkModeColors.neutral[0]}
          }
  
          .chakra-ui-light {
            background: ${lightModeColors.neutral[0]}
          }
        
        @media (min-width: 57em) {
          .chakra-ui-dark {
            background: ${darkModeColors.neutral[50]}
          }
  
          .chakra-ui-light {
            background: ${lightModeColors.neutral[50]}
          }
        }
      `}
  />
)
