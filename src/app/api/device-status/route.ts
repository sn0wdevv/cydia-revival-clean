import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(
request: Request
) {
try {
const body =
await request.json()


const { device_uuid } = body

if (!device_uuid) {
  return NextResponse.json(
    {
      linked: false,
      error:
        "Missing device_uuid",
    },
    {
      status: 400,
    }
  )
}

const { data: device } =
  await supabase
    .from("devices")
    .select("*")
    .eq(
      "device_uuid",
      device_uuid
    )
    .single()

if (!device) {
  return NextResponse.json({
    linked: false,
  })
}

const { data: purchases } =
  await supabase
    .from("purchases")
    .select("*")
    .eq(
      "user_id",
      device.user_id
    )

return NextResponse.json({
  linked: true,

  device,

  purchase_count:
    purchases?.length || 0,
})


} catch {
return NextResponse.json(
{
linked: false,
},
{
status: 500,
}
)
}
}
