import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

const authenticatedUser = atom(false)

export const useAuthenticatedUser = () => useAtomValue(authenticatedUser)
export const useSetAuthenticatedUser = () => useUpdateAtom(authenticatedUser)
