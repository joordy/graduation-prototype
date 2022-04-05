import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

const userData = atom(false)

export const useUserData = () => useAtomValue(userData)
export const useSetUserData = () => useUpdateAtom(userData)
