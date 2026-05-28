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


const { email, password } =
  body

const { data, error } =
  await supabase.auth.signInWithPassword({
    email,
    password,
  })

if (error || !data.user) {
  return NextResponse.json(
    {
      success: false,
      error:
        "Invalid credentials",
    },
    {
      status: 401,
    }
  )
}

return NextResponse.json({
  success: true,
  uid: data.user.id,
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
