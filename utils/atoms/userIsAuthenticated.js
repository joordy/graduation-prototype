import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

const authenticatedUser = atom(false)

export const useUserIsAuthenticated = () => useAtomValue(authenticatedUser)
export const useSetUserIsAuthenticated = () => useUpdateAtom(authenticatedUser)
