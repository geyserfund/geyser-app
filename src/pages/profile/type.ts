import { SetStateAction } from 'jotai'
import { Dispatch } from 'react'

import { UserForProfilePageFragment } from '../../types'

export type UserProfileState = {
  userProfile: UserForProfilePageFragment
  setUserProfile: Dispatch<SetStateAction<UserForProfilePageFragment>>
}
