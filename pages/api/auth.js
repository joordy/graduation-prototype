import { supabase } from '_utils/database/init'

const handler = (req, res) => {
    supabase.auth.api.setAuthCookie(req, res)
}

export default handler
