import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

const authenticatedUser = atom(false)

export const useIsUserAuth = () => useAtomValue(authenticatedUser)
export const useSetIsUserAuth = () => useUpdateAtom(authenticatedUser)
