import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { user_id, bundle_id } = body

    if (!user_id || !bundle_id) {
      return NextResponse.json(
        {
          error: "Missing fields",
        },
        {
          status: 400,
        }
      )
    }

    const { data: pkg } = await supabase
      .from("packages")
      .select("id")
      .eq("bundle_id", bundle_id)
      .single()

    if (!pkg) {
      return NextResponse.json(
        {
          purchased: false,
        },
        {
          status: 404,
        }
      )
    }

    const { data } = await supabase
      .from("purchase_sessions")
      .select("*")
      .eq("user_id", user_id)
      .eq("package_id", pkg.id)
      .eq("completed", true)
      .maybeSingle()

    return NextResponse.json({
      purchased: !!data,
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