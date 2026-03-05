type RegisterSwFn = (reloadPage?: boolean) => Promise<void>

export const useRegisterSW = (): {
  updateServiceWorker: RegisterSwFn
} => {
  return {
    updateServiceWorker: async () => undefined,
  }
}
