import { NextResponse }
from "next/server"

import {
createClient
}
from "@supabase/supabase-js"

const supabase =
createClient(
process.env
.NEXT_PUBLIC_SUPABASE_URL!,
process.env
.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(
request: Request
) {

try {


const body =
  await request.json()

const uid =
  body.uid

const result =
  await supabase
    .from("packages")
    .select("*")
    .eq(
      "owner_id",
      uid
    )

return NextResponse.json({
  success: true,
  packages:
    result.data || []
})


} catch {


return NextResponse.json({
  success: false
})


}

}
