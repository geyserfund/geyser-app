import { HStack, Link, Text } from '@chakra-ui/react'

interface DescriptionLinkWithIconComponentProps {
  title: React.ReactNode
  link?: string
  icon?: React.ReactNode
}

export const DescriptionLinkWithIconComponent = ({
  title,
  link,
  icon,
}: DescriptionLinkWithIconComponentProps) => {
  return (
    <HStack
      width="100%"
      borderRadius="4px"
      spacing={3}
      py={2}
      px={3}
      minHeight="42px"
      backgroundColor="neutral.100"
    >
      {icon}
      {link ? (
        <Link isExternal href={link}>
          <Text fontSize={'12px'} fontWeight={600} color="neutral.900">
            {title}
          </Text>
        </Link>
      ) : (
        <Text fontSize={'12px'} fontWeight={600} color="neutral.900">
          {title}
        </Text>
      )}
    </HStack>
  )
}
