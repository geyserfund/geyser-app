export const truthyFilter = (x: any): x is NonNullable<typeof x> => Boolean(x)
