import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

const userData = atom({})

export const useUserData = () => useAtomValue(userData)
export const useSetUserData = () => useUpdateAtom(userData)
