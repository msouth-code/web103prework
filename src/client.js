import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://iyldvytlrxsdobaxfkls.supabase.co'
const supabaseKey = 'sb_publishable_45hwaSVB3dvli37Q3itExA_gTbq9vp2'
export const supabase = createClient(supabaseUrl, supabaseKey)

