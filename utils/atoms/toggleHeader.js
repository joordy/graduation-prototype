import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

const toggleHeader = atom(false)

export const useToggleHeader = () => useAtomValue(toggleHeader)
export const useSetToggleHeader = () => useUpdateAtom(toggleHeader)
