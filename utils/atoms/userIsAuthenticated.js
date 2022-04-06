import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

const authenticatedUser = atom(false)

export const useUserIsAuth = () => useAtomValue(authenticatedUser)
export const useSetUserIsAuth = () => useUpdateAtom(authenticatedUser)
