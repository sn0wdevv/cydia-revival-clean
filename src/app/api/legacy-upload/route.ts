import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(
request: Request
) {
try {


const form =
  await request.formData()

const uid =
  form.get("uid")

const name =
  form.get("name")

const bundle_id =
  form.get("bundle_id")

const price =
  form.get("price")

const description =
  form.get("description")

const file =
  form.get("deb") as File

if (
  !uid ||
  !name ||
  !bundle_id ||
  !file
) {

  return NextResponse.json({
    success: false
  })

}

const bytes =
  await file.arrayBuffer()

const buffer =
  Buffer.from(bytes)

const uploadsDir =
  path.join(
    process.cwd(),
    "public",
    "debs"
  )

if (
  !fs.existsSync(
    uploadsDir
  )
) {

  fs.mkdirSync(
    uploadsDir,
    {
      recursive: true
    }
  )

}

const fileName =
  bundle_id + ".deb"

const filePath =
  path.join(
    uploadsDir,
    fileName
  )

fs.writeFileSync(
  filePath,
  buffer
)

const {
  error
} = await supabase
  .from("packages")
  .insert({
    owner_id: uid,
    name: name,
    bundle_id: bundle_id,
    price: Number(price),
    description:
      description,
    deb_url:
      "/debs/" +
      fileName
  })

if (error) {

  return NextResponse.json({
    success: false,
    error:
      error.message
  })

}

return NextResponse.json({
  success: true
})


} catch (e) {


return NextResponse.json({
  success: false
})


}
}
