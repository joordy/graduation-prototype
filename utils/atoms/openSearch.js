import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

const isSearchOpen = atom(false)

export const useOpenSearch = () => useAtomValue(isSearchOpen)
export const useSetOpenSearch = () => useUpdateAtom(isSearchOpen)
