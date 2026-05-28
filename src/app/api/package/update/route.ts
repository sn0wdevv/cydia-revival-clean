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
      bundle_id,
      version,
    } = body

    if (!bundle_id || !version) {
      return NextResponse.json(
        {
          error: "Missing parameters",
        },
        {
          status: 400,
        }
      )
    }

    const { data: pkg, error } = await supabase
      .from("packages")
      .select(`
        version,
        changelog,
        deb_url,
        name
      `)
      .eq("bundle_id", bundle_id)
      .single()

    if (error || !pkg) {
      return NextResponse.json(
        {
          error: "Package not found",
        },
        {
          status: 404,
        }
      )
    }

    const updateAvailable =
      pkg.version !== version

    return NextResponse.json({
      success: true,

      update_available: updateAvailable,

      latest_version: pkg.version,

      changelog: pkg.changelog,

      deb_url: pkg.deb_url,

      package_name: pkg.name,
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