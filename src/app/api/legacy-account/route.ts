import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(
request: Request
) {
try {
const body =
await request.json()


const { uid } = body

if (!uid) {
  return NextResponse.json(
    {
      success: false,
    },
    {
      status: 400,
    }
  )
}

const { data: profile } =
  await supabase
    .from("profiles")
    .select("username")
    .eq("id", uid)
    .single()

const {
  data: { user },
} = await supabase.auth.admin.getUserById(
  uid
)

return NextResponse.json({
  success: true,

  username:
    profile?.username ||
    "Unknown",

  email:
    user?.email || "",
})


} catch {
return NextResponse.json(
{
success: false,
},
{
status: 500,
}
)
}
}
