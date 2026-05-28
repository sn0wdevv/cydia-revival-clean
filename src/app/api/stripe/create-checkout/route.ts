import { NextResponse } from "next/server"
import Stripe from "stripe"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { payment_code } = body

    if (!payment_code) {
      return NextResponse.json(
        {
          error: "Missing payment code",
        },
        {
          status: 400,
        }
      )
    }

    const { data: sessionData } = await supabase
      .from("purchase_sessions")
      .select("*")
      .eq("payment_code", payment_code)
      .single()

    if (!sessionData) {
      return NextResponse.json(
        {
          error: "Session not found",
        },
        {
          status: 404,
        }
      )
    }

    const stripeSession =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        mode: "payment",

        line_items: [
          {
            price_data: {
              currency: "usd",

              product_data: {
                name: sessionData.package_name,
              },

              unit_amount:
                Math.round(
                  Number(sessionData.price) * 100
                ),
            },

            quantity: 1,
          },
        ],

        success_url:
          `https://cydia.sn0wcode.com/payment-success?code=${payment_code}`,

        cancel_url:
          `https://cydia.sn0wcode.com/pay/${payment_code}`,
      })

    return NextResponse.json({
      checkout_url: stripeSession.url,
    })
  } catch (err) {
    console.log(err)

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