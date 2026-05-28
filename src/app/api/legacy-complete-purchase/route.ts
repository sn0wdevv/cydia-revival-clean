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

const package_id =
  body.package_id

const pkgResult =
  await supabase
    .from("packages")
    .select("*")
    .eq(
      "id",
      package_id
    )
    .single()

const pkg =
  pkgResult.data

if (!pkg) {

  return NextResponse.json({
    success: false
  })

}

await supabase
  .from("purchases")
  .insert({
    user_id: uid,
    package_id:
      package_id,
    package_name:
      pkg.name
  })

return NextResponse.json({
  success: true
})


} catch {


return NextResponse.json({
  success: false
})


}

}
