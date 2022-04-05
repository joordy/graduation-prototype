import { supabase } from '_utils/auth/SupabaseClient'

export default function handler(req, res) {
    supabase.auth.api.setAuthCookie(req, res)
}
