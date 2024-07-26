import { ApolloCache, DefaultContext, MutationHookOptions, MutationTuple, OperationVariables } from '@apollo/client'
import { useCallback } from 'react'

type CustomMutationHook<TData, TVariables, TContext = DefaultContext> = (
  options?: MutationHookOptions<TData, TVariables, TContext>,
) => MutationTuple<TData, TVariables, TContext>

export const useCustomMutation = <
  TData,
  TVariables extends OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache<any> = ApolloCache<any>,
>(
  useGeneratedMutationHook: CustomMutationHook<TData, TVariables, TContext>,
  options?: Omit<MutationHookOptions<TData, TVariables, TContext, TCache>, 'onCompleted'> & {
    onCompleted?: (data: TData) => void
  },
): MutationTuple<TData, TVariables, TContext> => {
  const [mutationCall, mutationState] = useGeneratedMutationHook(options as any)

  const customMutationCall = useCallback(
    (
      callOptions?: Omit<Parameters<typeof mutationCall>[0], 'onCompleted'> & {
        onCompleted?: (data: TData) => void
      },
    ): ReturnType<typeof mutationCall> => {
      return mutationCall({
        ...callOptions,
        onCompleted(data) {
          options?.onCompleted?.(data)
          callOptions?.onCompleted?.(data)
        },
      } as Parameters<typeof mutationCall>[0])
    },
    [mutationCall, options],
  )

  return [customMutationCall, mutationState]
}
