import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.APOLLO_GRAPH_VARIANT === 'development' ? 'http://geyser-server:4000/graphql' : './schema.graphql',
  documents: ['src/graphql/**/*', 'src/modules/**/graphql/**/*'],
  config: {
    maybe: 'T | null | undefined',
    inputMaybe: 'T | null | undefined',
  },
  generates: {
    'src/types/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        inlineFragmentTypes: 'combine',
      },
    },
  },
}
export default config
