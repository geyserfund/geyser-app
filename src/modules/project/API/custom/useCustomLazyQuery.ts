import { ApolloQueryResult, LazyQueryHookOptions, OperationVariables, QueryResult } from '@apollo/client'
import { useCallback } from 'react'

type CustomLazyQueryHook<TData, TVariables extends OperationVariables> = (
  options?: LazyQueryHookOptions<TData, TVariables>,
) => [
  (options?: Partial<LazyQueryHookOptions<TData, TVariables>>) => Promise<ApolloQueryResult<TData>>,
  QueryResult<TData, TVariables>,
]

export const useCustomLazyQuery = <TData, TVariables extends OperationVariables>(
  useGeneratedLazyQueryHook: CustomLazyQueryHook<TData, TVariables>,
  options?: Omit<LazyQueryHookOptions<TData, TVariables>, 'onCompleted'> & {
    onCompleted?: (data: TData) => void
  },
): [
  (options?: Partial<LazyQueryHookOptions<TData, TVariables>>) => Promise<ApolloQueryResult<TData>>,
  QueryResult<TData, TVariables>,
] => {
  const [lazyQuery, queryResult] = useGeneratedLazyQueryHook(options as any)

  const customLazyQuery = useCallback(
    (
      callOptions?: Omit<Parameters<typeof lazyQuery>[0], 'onCompleted'> & {
        onCompleted?: (data: TData) => void
      },
    ) => {
      return lazyQuery({
        ...callOptions,
        onCompleted(data) {
          options?.onCompleted?.(data)
          callOptions?.onCompleted?.(data)
        },
      } as Parameters<typeof lazyQuery>[0])
    },
    [lazyQuery, options],
  )

  return [customLazyQuery, queryResult]
}
