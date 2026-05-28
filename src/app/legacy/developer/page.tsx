"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LegacyDeveloperPage() {
const router = useRouter()

const [loading, setLoading] =
useState(true)

const [packages, setPackages] =
useState<any[]>([]

)

useEffect(() => {
loadDeveloper()
}, [])

async function loadDeveloper() {
const {
data: { session },
} = await supabase.auth.getSession()


if (!session) {
  router.push("/legacy/login")
  return
}

const { data } = await supabase
  .from("packages")
  .select("*")
  .eq("developer_id", session.user.id)

if (data) {
  setPackages(data)
}

setLoading(false)


}

if (loading) {
return null
}

return (
<main
style={{
background: "#c5ccd4",
minHeight: "100vh",
padding: "20px",
fontFamily: "Helvetica",
}}
>
<div
style={{
maxWidth: "420px",
margin: "0 auto",
}}
>
<div
style={{
background: "#f2f2f2",
border: "1px solid #999",
borderRadius: "8px",
overflow: "hidden",
marginBottom: "16px",
}}
>
<div
style={{
background:
"linear-gradient(#6d84a2,#2d4f7c)",
color: "white",
padding: "12px",
textAlign: "center",
fontWeight: "bold",
fontSize: "22px",
}}
>
Developer Panel </div>


      <a
        href="/legacy/upload"
        style={uploadButton}
      >
        Publish Package
      </a>
    </div>

    <div
      style={{
        background: "#f2f2f2",
        border: "1px solid #999",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {packages.length === 0 && (
        <div
          style={{
            padding: "16px",
            textAlign: "center",
            color: "#666",
          }}
        >
          No published packages.
        </div>
      )}

      {packages.map((pkg) => (
        <div
          key={pkg.id}
          style={cellStyle}
        >
          <div
            style={{
              fontWeight: "bold",
              color: "#000",
            }}
          >
            {pkg.name}
          </div>

          <div
            style={{
              fontSize: "13px",
              color: "#666",
              marginTop: "2px",
            }}
          >
            {pkg.bundle_id}
          </div>
        </div>
      ))}
    </div>

    <div
      style={{
        textAlign: "center",
        marginTop: "20px",
        color: "#666",
        fontSize: "13px",
      }}
    >
      by sn0wcode
    </div>
  </div>
</main>


)
}

const uploadButton = {
display: "block",
padding: "14px",
background:
"linear-gradient(#6d84a2,#2d4f7c)",
color: "white",
textDecoration: "none",
textAlign: "center" as const,
fontWeight: "bold",
}

const cellStyle = {
padding: "14px",
borderBottom: "1px solid #ccc",
background: "white",
}
