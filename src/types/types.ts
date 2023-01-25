declare const __nominalType: unique symbol;

export type Nominal<Type, Identifier> = Type & {
  readonly [__nominalType]: Identifier;
};

export type Satoshis = Nominal<number, 'Satoshis'>;
export type USDCents = Nominal<number, 'USDCents'>;
export type USDollars = Nominal<number, 'USDollars'>;

export type Satoshi = number;

export type GrantTextType = {
  title?: string;
  subtitle?: string;
  isSatLogo: boolean;
};
