import { Icon, IconProps } from '@chakra-ui/react'

export const SatoshiIconTilted = ({
  dash,
  scale = 1,
  ...rest
}: IconProps & { dash?: boolean; scale?: number }) => {
  const height = scale * 25

  if (dash) {
    return (
      <Icon
        width="auto"
        height={`${height}px`}
        viewBox="0 0 10 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        paddingBottom="2px"
        {...rest}
      >
        <g clipPath="url(#clip0_593_123592)">
          <path
            d="M5.00054 10.6241C7.74663 10.6241 9.97277 8.39799 9.97277 5.65191C9.97277 2.90583 7.74663 0.679688 5.00054 0.679688C2.25446 0.679688 0.0283203 2.90583 0.0283203 5.65191C0.0283203 8.39799 2.25446 10.6241 5.00054 10.6241Z"
            fill="none"
          />
          <path
            d="M6.38162 1.78854L5.75098 1.62109L5.46484 2.69875L6.09549 2.8662L6.38162 1.78854Z"
            fill="currentColor"
          />
          <path
            d="M4.53397 8.74069L3.90332 8.57324L3.61718 9.6509L4.24783 9.81835L4.53397 8.74069Z"
            fill="currentColor"
          />
          <path
            d="M7.60794 4.95487L7.77539 4.32422L3.2787 3.13026L3.11125 3.76091L7.60794 4.95487Z"
            fill="currentColor"
          />
          <path
            d="M7.16849 6.61893L7.33594 5.98828L2.83925 4.79433L2.6718 5.42497L7.16849 6.61893Z"
            fill="currentColor"
          />
          <path
            d="M6.73782 8.23905L6.90527 7.6084L2.40858 6.41444L2.24113 7.04509L6.73782 8.23905Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_593_123592">
            <rect
              width="10"
              height="10"
              fill="currentColor"
              transform="translate(0 0.652344)"
            />
          </clipPath>
        </defs>
      </Icon>
    )
  }

  return (
    <Icon
      width="auto"
      height={`${height}px`}
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      paddingBottom="3px"
      {...rest}
    >
      <g clipPath="url(#clip0_593_123592)">
        <path
          d="M5.00054 10.6241C7.74663 10.6241 9.97277 8.39799 9.97277 5.65191C9.97277 2.90583 7.74663 0.679688 5.00054 0.679688C2.25446 0.679688 0.0283203 2.90583 0.0283203 5.65191C0.0283203 8.39799 2.25446 10.6241 5.00054 10.6241Z"
          fill="none"
        />
        <path
          d="M6.38162 1.78854L5.75098 1.62109L5.46484 2.69875L6.09549 2.8662L6.38162 1.78854Z"
          fill="currentColor"
        />
        <path
          d="M4.53397 8.74069L3.90332 8.57324L3.61718 9.6509L4.24783 9.81835L4.53397 8.74069Z"
          fill="currentColor"
        />
        <path
          d="M7.60794 4.95487L7.77539 4.32422L3.2787 3.13026L3.11125 3.76091L7.60794 4.95487Z"
          fill="currentColor"
        />
        <path
          d="M7.16849 6.61893L7.33594 5.98828L2.83925 4.79433L2.6718 5.42497L7.16849 6.61893Z"
          fill="currentColor"
        />
        <path
          d="M6.73782 8.23905L6.90527 7.6084L2.40858 6.41444L2.24113 7.04509L6.73782 8.23905Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_593_123592">
          <rect
            width="10"
            height="10"
            fill="currentColor"
            transform="translate(0 0.652344)"
          />
        </clipPath>
      </defs>
    </Icon>
  )
}
