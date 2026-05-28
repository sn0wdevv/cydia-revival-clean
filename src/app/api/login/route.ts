import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Missing email or password",
        },
        {
          status: 400,
        }
      )
    }

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (error || !data.session) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid credentials",
        },
        {
          status: 401,
        }
      )
    }

    return NextResponse.json({
      success: true,

      user: {
        id: data.user.id,
        email: data.user.email,
      },

      access_token: data.session.access_token,
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