import { createUseStyles } from 'react-jss'

import { AppTheme } from '@/context'
import { useCustomTheme } from '@/utils'

const useStyles = createUseStyles(({ colors }: AppTheme) => ({
  thumbnailImagePlaceholder: {
    height: '142px',
    width: '100%',
    borderRadius: '0.5em',
    backgroundColor: colors.neutral1[2],
    padding: '2rem',
  },
}))

type Props = React.SVGProps<SVGSVGElement>

export const ProjectPostCardThumbnailPlaceholder = ({ ...rest }: Props) => {
  const styles = useStyles()

  const { colors } = useCustomTheme()

  return (
    <svg
      className={styles.thumbnailImagePlaceholder}
      viewBox="0 0 91 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <g filter="url(#filter0_d_2775_127526)">
        <path
          d="M66.5561 24.7337C66.5189 24.513 66.4809 24.2925 66.4385 24.0732C66.3031 23.3669 66.3031 23.3669 66.3031 23.3669C66.1129 22.6021 65.2549 21.9764 64.397 21.9762L43.5973 21.9744C42.739 21.9742 41.8205 22.6328 41.5561 23.4376L37.1369 36.8881C37.0064 37.2854 36.8349 37.7747 37.0244 38.0391C37.2191 38.3103 37.782 38.3515 38.2166 38.3515H46.6849C46.6849 38.3515 47.0805 38.3483 47.1331 38.619C47.1895 38.9065 46.8862 39.2161 46.8862 39.2161L31.9589 54.6832C31.4367 55.2244 30.5249 56.1683 29.9331 56.7806L26.1041 60.7415C26.1041 60.7415 26.026 60.8281 25.9346 60.9111C25.8819 60.9592 25.8313 61.0012 25.783 61.0383C25.2519 61.4451 25.0007 61.2175 25.221 60.4734L27.1694 53.8909C27.4099 53.0789 27.803 51.7498 28.0435 50.9378L29.1594 47.1677C29.3466 46.5354 29.559 45.8183 29.6926 45.3663C29.7306 45.2379 29.819 44.8419 29.6854 44.6417C29.5587 44.4515 29.3451 44.4155 29.1053 44.4155C28.8455 44.4155 28.5394 44.4155 28.2176 44.4155H20.1523C19.294 44.4155 19.0059 43.9872 19.5119 43.4637C20.018 42.9402 20.9163 42.0108 21.5084 41.3984L27.7789 34.9121C28.371 34.2997 29.2825 33.3558 29.8051 32.8144C30.3276 32.273 31.2391 31.3288 31.8305 30.7158L32.8893 29.6185C33.4811 29.0055 34.4489 28.0025 35.0403 27.3896L37.2134 25.1383C37.8047 24.5253 38.7339 23.5626 39.2775 22.999C39.8215 22.4355 40.4092 21.8266 40.5833 21.6459C40.7574 21.4654 41.3838 20.8162 41.9756 20.2032L54.0651 7.67643C54.6568 7.06341 54.5411 6.20166 53.8086 5.76121C53.8086 5.76121 52.0986 4.73359 50.4759 4.06558C46.2585 2.32907 41.6802 1.71116 37.0554 2.12268C35.7514 2.23881 34.4469 2.43615 33.1493 2.71309C29.6478 3.46087 26.2184 4.77736 22.9907 6.60215C20.9754 7.74101 19.047 9.07505 17.2348 10.5844C12.9663 14.1388 9.3843 18.6313 6.83927 23.8334C5.57492 26.4175 4.64249 29.0281 4.01187 31.6119C2.68991 37.028 2.70073 42.346 3.82564 47.131C4.5735 50.3152 5.81803 53.2842 7.50603 55.9208C7.60896 56.0818 7.71428 56.2419 7.8207 56.4004C8.7291 57.7537 9.7608 59.0185 10.9079 60.18C12.6577 61.9516 14.6861 63.49 16.9823 64.7334C18.1272 65.3537 19.3024 65.8799 20.4989 66.3187C21.1787 66.5676 21.866 66.7892 22.5597 66.9817C23.749 67.3123 24.9585 67.5601 26.1801 67.7302C36.8211 69.2078 49.1962 64.5925 57.7466 54.4712C59.3829 52.5343 60.8081 50.4854 62.0196 48.3581C63.6104 45.5656 64.8309 42.6374 65.6659 39.6523C66.3622 37.1629 66.789 34.6376 66.9391 32.125C67.0886 29.6265 66.9636 27.1458 66.5561 24.7337Z"
          fill={colors.neutral1[3]}
        />
      </g>
      <g filter="url(#filter1_d_2775_127526)">
        <path
          d="M51 49.4286C51 46.9859 52.9059 45 55.25 45H80.75C83.0941 45 85 46.9859 85 49.4286V71.5714C85 74.0141 83.0941 76 80.75 76H55.25C52.9059 76 51 74.0141 51 71.5714V49.4286ZM72.5023 56.798C72.2035 56.3413 71.7121 56.0714 71.1875 56.0714C70.6629 56.0714 70.1648 56.3413 69.8727 56.798L64.0953 65.6275L62.3355 63.3371C62.0301 62.9426 61.5719 62.7143 61.0938 62.7143C60.6156 62.7143 60.1508 62.9426 59.852 63.3371L55.602 68.8728C55.2168 69.371 55.1438 70.056 55.4094 70.6304C55.675 71.2047 56.2328 71.5714 56.8438 71.5714H63.2188H65.3438H79.1562C79.7473 71.5714 80.2918 71.2324 80.5641 70.6857C80.8363 70.1391 80.8031 69.4817 80.4711 68.9766L72.5023 56.798ZM58.4375 56.0714C60.1973 56.0714 61.625 54.5837 61.625 52.75C61.625 50.9163 60.1973 49.4286 58.4375 49.4286C56.6777 49.4286 55.25 50.9163 55.25 52.75C55.25 54.5837 56.6777 56.0714 58.4375 56.0714Z"
          fill={colors.neutral1[3]}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_2775_127526"
          x="0.2"
          y="0.4"
          width="72"
          height="74"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1.2" dy="2.4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2775_127526" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2775_127526" result="shape" />
        </filter>
        <filter
          id="filter1_d_2775_127526"
          x="48.2"
          y="43.4"
          width="42"
          height="39"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1.2" dy="2.4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2775_127526" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2775_127526" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}
