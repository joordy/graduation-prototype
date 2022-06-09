import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

const notifications = atom([])

export const useNotifications = () => useAtomValue(notifications)
export const useSetNotifications = () => useUpdateAtom(notifications)
