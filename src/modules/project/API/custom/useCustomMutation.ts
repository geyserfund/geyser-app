import {
  ApolloCache,
  BaseMutationOptions,
  DefaultContext,
  MutationHookOptions,
  MutationTuple,
  OperationVariables,
} from '@apollo/client'
import { useCallback } from 'react'

type CustomMutationHook<TData, TVariables, TContext = DefaultContext> = (
  options?: MutationHookOptions<TData, TVariables, TContext>,
) => MutationTuple<TData, TVariables, TContext>

/** Custom mutation hook to execute both onCompleted hook on definition and onCall */
export const useCustomMutation = <
  TData,
  TVariables extends OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache<any> = ApolloCache<any>,
>(
  useGeneratedMutationHook: CustomMutationHook<TData, TVariables, TContext>,
  options?: Omit<MutationHookOptions<TData, TVariables, TContext, TCache>, 'onCompleted'> & {
    onCompleted?: (
      data: TData,
      clientOptions: BaseMutationOptions<any, OperationVariables, DefaultContext, ApolloCache<any>> | undefined,
    ) => void
  },
): MutationTuple<TData, TVariables, TContext> => {
  const [mutationCall, mutationState] = useGeneratedMutationHook(options as any)

  const customMutationCall = useCallback(
    (
      callOptions?: Omit<Parameters<typeof mutationCall>[0], 'onCompleted'> & {
        onCompleted?: (
          data: TData,
          clientOptions: BaseMutationOptions<any, OperationVariables, DefaultContext, ApolloCache<any>> | undefined,
        ) => void
      },
    ): ReturnType<typeof mutationCall> => {
      return mutationCall({
        ...callOptions,
        onCompleted(data, clientOptions) {
          options?.onCompleted?.(data, clientOptions)
          callOptions?.onCompleted?.(data, clientOptions)
        },
      } as Parameters<typeof mutationCall>[0])
    },
    [mutationCall, options],
  )

  return [customMutationCall, mutationState]
}
