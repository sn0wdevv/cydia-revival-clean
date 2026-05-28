import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(
request: Request
) {
try {
const body =
await request.json()


const {
  device_uuid,
  package_id,
} = body

if (
  !device_uuid ||
  !package_id
) {
  return NextResponse.json(
    {
      owned: false,
      error:
        "Missing fields",
    },
    {
      status: 400,
    }
  )
}

const { data: device } =
  await supabase
    .from("devices")
    .select("user_id")
    .eq(
      "device_uuid",
      device_uuid
    )
    .single()

if (!device) {
  return NextResponse.json({
    owned: false,
  })
}

const { data: purchase } =
  await supabase
    .from("purchases")
    .select("*")
    .eq(
      "user_id",
      device.user_id
    )
    .eq(
      "package_id",
      package_id
    )
    .single()

return NextResponse.json({
  owned: !!purchase,
})


} catch {
return NextResponse.json(
{
owned: false,
},
{
status: 500,
}
)
}
}
