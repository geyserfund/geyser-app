import { Global } from '@emotion/react'

import { darkModeColors, lightModeColors } from '../shared/styles'

const GlobalStyles = () => (
  <Global
    styles={`
        @import url('https://fonts.googleapis.com/css2?family=Solway:wght@300;400;500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;600;700&display=swap');
		    @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Livvic:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&family=Hubot+Sans:ital,wght@0,200..900;1,200..900&display=swap');

        
        @font-face {
            font-family: "Figtree", sans-serif;
            font-weight: 400;
            font-style: normal;
            font-display: swap;
        }

        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }

        .chakra-ui-light ::-webkit-scrollbar-track {
          background: ${lightModeColors.neutral1[3]};
          border-radius: 4px;
        }

        .chakra-ui-light ::-webkit-scrollbar-thumb {
          background: ${lightModeColors.neutral1[8]};
          border-radius: 4px;
        }

        .chakra-ui-light ::-webkit-scrollbar-thumb:hover {
          background: ${lightModeColors.neutral1[9]};
        }

        .chakra-ui-dark ::-webkit-scrollbar-track {
          background: ${darkModeColors.neutral1[3]};
          border-radius: 4px;
        }

        .chakra-ui-dark ::-webkit-scrollbar-thumb {
          background: ${darkModeColors.neutral1[8]};
          border-radius: 4px;
        }

        .chakra-ui-dark ::-webkit-scrollbar-thumb:hover {
          background: ${darkModeColors.neutral1[9]};
        }


        button:focus {
            box-shadow: none !important;
        }
        
        body {
            overflow: overlay;
        }

        a {
            text-decoration: none;
          }
        
        a:hover {
            text-decoration: none;
          }
        
        .chakra-ui-dark {
            background: ${darkModeColors.utils.pbg}
          }
  
          .chakra-ui-light {
            background: ${lightModeColors.utils.pbg}
          }
        
        @media (min-width: 57em) {
          .chakra-ui-dark {
            background: ${darkModeColors.neutral1[1]}
          }
  
          .chakra-ui-light {
            background: ${lightModeColors.neutral1[1]}
          }
        }
      `}
  />
)

export default GlobalStyles
