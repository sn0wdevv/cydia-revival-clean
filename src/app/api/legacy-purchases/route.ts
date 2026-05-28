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
      purchases: [],
    },
    {
      status: 400,
    }
  )
}

const { data } =
  await supabase
    .from("purchases")
    .select("*")
    .eq("user_id", uid)

return NextResponse.json({
  success: true,
  purchases: data || [],
})


} catch {
return NextResponse.json(
{
success: false,
purchases: [],
},
{
status: 500,
}
)
}
}
