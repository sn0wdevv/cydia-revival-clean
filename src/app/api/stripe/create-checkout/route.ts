import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY as string
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
                  "Test Package"

              },

              unit_amount:
                199

            },

            quantity: 1

          }

        ],

        metadata: {

          package_id:
            package_id,

          user_id:
            "test-user"

        },

        success_url:
          "http://localhost:3000/success.html",

        cancel_url:
          "http://localhost:3000/legacy/purchase.html"

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