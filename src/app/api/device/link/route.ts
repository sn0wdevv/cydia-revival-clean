import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      user_id,
      device_id,
      device_name,
    } = body

    if (!user_id || !device_id) {
      return NextResponse.json(
        {
          error: "Missing parameters",
        },
        {
          status: 400,
        }
      )
    }

    const { data: existing } = await supabase
      .from("devices")
      .select("id")
      .eq("user_id", user_id)
      .eq("device_id", device_id)
      .single()

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Device already linked",
      })
    }

    const { error } = await supabase
      .from("devices")
      .insert({
        user_id,
        device_id,
        device_name,
      })

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Device linked successfully",
    })
  } catch {
    return NextResponse.json(
      {
        error: "Server error",
      },
      {
        status: 500,
      }
    )
  }
}