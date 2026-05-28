import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function generateCode() {
  return Math.random()
    .toString(36)
    .substring(2, 10)
}

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
      .select("*")
      .eq("bundle_id", bundle_id)
      .single()

    if (!pkg) {
      return NextResponse.json(
        {
          error: "Package not found",
        },
        {
          status: 404,
        }
      )
    }

    const paymentCode = generateCode()

    await supabase
      .from("purchase_sessions")
      .insert({
        user_id,
        package_id: pkg.id,
        payment_code: paymentCode,
        package_name: pkg.name,
        price: pkg.price,
      })

    return NextResponse.json({
      success: true,

      payment_url:
        `https://cydia.sn0wcode.com/pay/${paymentCode}`,
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