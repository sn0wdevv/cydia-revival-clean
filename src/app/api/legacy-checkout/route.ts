import Stripe from "stripe"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY as string
)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

export async function POST(request: Request) {

  try {

    const body =
      await request.json()

    const uid =
      body.uid

    const package_id =
      body.package_id

    const { data: pkg } =
      await supabase
        .from("packages")
        .select("*")
        .eq("id", package_id)
        .single()

    if (!pkg) {

      return NextResponse.json({
        success: false,
        error: "Package not found"
      })

    }

    const session =
      await stripe.checkout.sessions.create({

        payment_method_types: [
          "card"
        ],

        mode: "payment",

        line_items: [
          {
            price_data: {

              currency: "usd",

              product_data: {
                name: pkg.name
              },

              unit_amount:
                Math.round(
                  pkg.price * 100
                )

            },

            quantity: 1
          }
        ],

        success_url:
          process.env.NEXT_PUBLIC_SITE_URL +
          "/legacy/success.html?package=" +
          pkg.id +
          "&uid=" +
          uid,

        cancel_url:
          process.env.NEXT_PUBLIC_SITE_URL +
          "/legacy/package.html?id=" +
          pkg.bundle_id

      })

    return NextResponse.json({
      success: true,
      url: session.url
    })

  } catch (error: any) {

    console.log(error)

    return NextResponse.json({
      success: false,
      error:
        error?.message ||
        "Unknown error"
    })

  }

}