import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(
request: Request
) {
try {
const body =
await request.json()


const {
  user_id,
  device_uuid,
  device_name,
  ios_version,
} = body

if (
  !user_id ||
  !device_uuid
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

const { data: existing } =
  await supabase
    .from("devices")
    .select("*")
    .eq(
      "device_uuid",
      device_uuid
    )
    .single()

if (existing) {
  return NextResponse.json({
    success: true,
    already_linked: true,
  })
}

const { error } =
  await supabase
    .from("devices")
    .insert({
      user_id,

      device_uuid,

      device_name:
        device_name ||
        "Unknown Device",

      ios_version:
        ios_version || "Unknown",
    })

if (error) {
  return NextResponse.json(
    {
      success: false,
      error: error.message,
    },
    {
      status: 500,
    }
  )
}

return NextResponse.json({
  success: true,
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
