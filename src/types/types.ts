declare const __nominalType: unique symbol

export type Nominal<Type, Identifier> = Type & {
  readonly [__nominalType]: Identifier
}

export type Satoshis = Nominal<number, 'Satoshis'>
export type USDCents = Nominal<number, 'USDCents'>
export type USDollars = Nominal<number, 'USDollars'>

export type Satoshi = number

export type FormError<T> = {
  [key in keyof T]?: React.ReactNode
}

export type MutationInput<T> = {
  input: T
}

declare let twttr: any
