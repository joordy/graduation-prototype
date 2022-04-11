import { supabase } from '_utils/database/init'

export default function handler(req, res) {
    supabase.auth.api.setAuthCookie(req, res)
}
