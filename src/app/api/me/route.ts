import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { access_token } = body

    if (!access_token) {
      return NextResponse.json(
        {
          error: "Missing token",
        },
        {
          status: 400,
        }
      )
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(access_token)

    if (error || !user) {
      return NextResponse.json(
        {
          error: "Invalid token",
        },
        {
          status: 401,
        }
      )
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single()

    return NextResponse.json({
      id: user.id,
      email: user.email,
      username: profile?.username || null,
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