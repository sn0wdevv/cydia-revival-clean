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

const purchaseResult =
  await supabase
    .from("purchases")
    .select("*")
    .eq(
      "user_id",
      uid
    )
    .eq(
      "package_id",
      package_id
    )
    .single()

if (
  !purchaseResult.data
) {

  return NextResponse.json({
    success: false
  })

}

const packageResult =
  await supabase
    .from("packages")
    .select("*")
    .eq(
      "id",
      package_id
    )
    .single()

const pkg =
  packageResult.data

if (!pkg) {

  return NextResponse.json({
    success: false
  })

}

return NextResponse.json({
  success: true,
  download_url:
    pkg.deb_url
})


} catch {


return NextResponse.json({
  success: false
})


}

}
