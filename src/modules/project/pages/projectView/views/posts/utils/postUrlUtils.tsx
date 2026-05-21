import { Link as ChakraLink, Text } from '@chakra-ui/react'

/**
 * Returns true when the string is a valid http/https URL.
 * Rejects javascript:, data:, mailto:, file:, and other non-web schemes.
 */
export const isValidUrl = (str: string): boolean => {
  try {
    const url = new URL(str)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

/** Extracts the hostname from a URL string, stripping www., or returns the original string on failure. */
export const extractDomain = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

/** Renders plain text with any http/https URLs as clickable external links. */
export const LinkifiedText = ({ text }: { text: string }) => {
  const urlRegex = /(https?:\/\/[^\s]+)/
  const parts = text.split(/(https?:\/\/[^\s]+)/)
  return (
    <>
      {parts.map((part, i) =>
        urlRegex.test(part) ? (
          <ChakraLink key={i} href={part} isExternal color="primary1.11" wordBreak="break-all">
            {part}
          </ChakraLink>
        ) : (
          <Text key={i} as="span">
            {part}
          </Text>
        ),
      )}
    </>
  )
}
