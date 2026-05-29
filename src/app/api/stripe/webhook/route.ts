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
      await req.text();

    const sig =
      req.headers.get(
        "stripe-signature"
      ) as string;

    const event =
      stripe.webhooks.constructEvent(

        body,

        sig,

        process.env
          .STRIPE_WEBHOOK_SECRET as string

      );

    if(
      event.type ===
      "checkout.session.completed"
    ) {

      const session =
        event.data.object as Stripe.Checkout.Session;

      const packageId =
        session.metadata?.package_id;

      const userId =
        session.metadata?.user_id;

      if(
        packageId &&
        userId
      ) {

        await supabase
          .from("purchases")
          .insert({

            user_id:
              userId,

            package_id:
              packageId

          });

      }

    }

    return NextResponse.json({
      received: true
    });

  } catch(err) {

    console.log(err);

    return NextResponse.json(
      {
        error: "Webhook Error"
      },
      {
        status: 400
      }
    );

  }

}