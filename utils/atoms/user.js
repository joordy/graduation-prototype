import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

const user = atom(null)

export const useUser = () => useAtomValue(user)
export const useSetUser = () => useUpdateAtom(user)
