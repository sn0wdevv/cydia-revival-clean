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
  uid,
  bundle_id,
} = body

if (!bundle_id) {
  return NextResponse.json(
    {
      success: false,
    },
    {
      status: 400,
    }
  )
}

const { data: pkg } =
  await supabase
    .from("packages")
    .select("*")
    .eq(
      "bundle_id",
      bundle_id
    )
    .single()

if (!pkg) {
  return NextResponse.json(
    {
      success: false,
    },
    {
      status: 404,
    }
  )
}

let owned = false

if (uid) {
  const {
    data: purchase,
  } = await supabase
    .from("purchases")
    .select("*")
    .eq("user_id", uid)
    .eq(
      "package_id",
      pkg.id
    )
    .single()

  owned = !!purchase
}

return NextResponse.json({
  success: true,
  package: pkg,
  owned,
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
