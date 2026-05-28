import { createClient }
from "@supabase/supabase-js"

const supabase =
createClient(
process.env
.NEXT_PUBLIC_SUPABASE_URL!,
process.env
.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {

const result =
await supabase
.from("packages")
.select("*")

const packages =
result.data || []

var output = ""

for (
var i = 0;
i < packages.length;
i++
) {


var pkg =
  packages[i]

output +=
  "Package: " +
  pkg.bundle_id +
  "\n" +

  "Name: " +
  pkg.name +
  "\n" +

  "Version: 1.0\n" +

  "Architecture: iphoneos-arm\n" +

  "Description: " +
  (pkg.description || "") +
  "\n" +

  "Maintainer: " +
  pkg.owner_id +
  "\n" +

  "Author: sn0wcode\n" +

  "Section: Tweaks\n" +

  "Depends: mobilesubstrate\n" +

  "Filename: " +
  pkg.deb_url.replace(
    "/",
    ""
  ) +
  "\n" +

  "Size: 1337\n" +

  "Installed-Size: 1337\n\n"


}

return new Response(
output,
{
headers: {
"Content-Type":
"text/plain"
}
}
)

}
