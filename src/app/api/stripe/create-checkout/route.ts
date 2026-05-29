import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY as string
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(req: Request) {

  try {

    const body =
      await req.json();

    const package_id =
      body.package_id;

    if(!package_id) {

      return NextResponse.json(
        {
          success: false
        },
        {
          status: 400
        }
      );

    }

    /*
        FIND PACKAGE
    */

    const result =
      await supabase
        .from("packages")
        .select("*")
        .eq(
          "bundle_id",
          package_id
        )
        .single();

    const pkg =
      result.data;

    if(!pkg) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Package not found"
        },
        {
          status: 404
        }
      );

    }

    /*
        CREATE STRIPE SESSION
    */

    const stripeSession =
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

                name:
                  pkg.name

              },

              unit_amount:
                Math.round(
                  Number(pkg.price) * 100
                )

            },

            quantity: 1

          }

        ],

        metadata: {

          package_id:
            pkg.id,

          bundle_id:
            pkg.bundle_id,

          user_id:
            "test-user"

        },

        success_url:
          "https://cydia.sn0wcode.com/payment-success",

        cancel_url:
          "https://cydia.sn0wcode.com/legacy/purchase.html?package=" +
          pkg.bundle_id

      });

    return NextResponse.json({

      success: true,

      url:
        stripeSession.url

    });

  } catch(err) {

    console.log(err);

    return NextResponse.json(
      {
        success: false
      },
      {
        status: 500
      }
    );

  }

}