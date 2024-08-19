import { atom } from 'jotai'

export enum TimePeriod {
  Week = 'week',
  Month = 'month',
}
export const periodAtom = atom<TimePeriod>(TimePeriod.Week)
