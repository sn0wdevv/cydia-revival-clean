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


const {
  email,
  password,
  username,
} = body

if (
  !email ||
  !password ||
  !username
) {
  return NextResponse.json(
    {
      success: false,
      error:
        "Missing fields",
    },
    {
      status: 400,
    }
  )
}

const {
  data: authData,
  error,
} = await supabase.auth.signUp({
  email,
  password,
})

if (
  error ||
  !authData.user
) {
  return NextResponse.json(
    {
      success: false,
      error:
        error?.message ||
        "Registration failed",
    },
    {
      status: 400,
    }
  )
}

await supabase
  .from("profiles")
  .insert({
    id: authData.user.id,
    username,
  })

return NextResponse.json({
  success: true,
  uid: authData.user.id,
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
