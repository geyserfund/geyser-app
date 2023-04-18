import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './schema.graphql',
  documents: 'src/graphql/**/*',
  generates: {
    'src/types/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        // documentMode: 'documentNodeImportFragments',
        inlineFragmentTypes: 'combine',
      },
    },
  },
}
export default config
