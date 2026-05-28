"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function LegacyUploadPage() {
const router = useRouter()

const [name, setName] =
useState("")

const [bundleId, setBundleId] =
useState("")

const [repoUrl, setRepoUrl] =
useState("")

const [price, setPrice] =
useState("")

async function publishPackage() {
const {
data: { session },
} = await supabase.auth.getSession()


if (!session) {
  router.push("/legacy/login")
  return
}

const { error } = await supabase
  .from("packages")
  .insert({
    developer_id:
      session.user.id,

    name,

    bundle_id: bundleId,

    repo_url: repoUrl,

    price:
      Number(price),
  })

if (error) {
  alert(error.message)
  return
}

alert("Package published")

window.location.href =
  "/legacy/developer"


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
background: "#f2f2f2",
border: "1px solid #999",
borderRadius: "8px",
overflow: "hidden",
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
Publish Package </div>


    <div
      style={{
        padding: "15px",
      }}
    >
      <input
        placeholder="Package Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        style={inputStyle}
      />

      <input
        placeholder="Bundle ID"
        value={bundleId}
        onChange={(e) =>
          setBundleId(
            e.target.value
          )
        }
        style={inputStyle}
      />

      <input
        placeholder="Repo URL"
        value={repoUrl}
        onChange={(e) =>
          setRepoUrl(
            e.target.value
          )
        }
        style={inputStyle}
      />

      <input
        placeholder="Price"
        value={price}
        onChange={(e) =>
          setPrice(
            e.target.value
          )
        }
        style={inputStyle}
      />

      <button
        onClick={publishPackage}
        style={buttonStyle}
      >
        Publish
      </button>

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
  </div>
</main>


)
}

const inputStyle = {
width: "100%",
padding: "10px",
marginBottom: "12px",
border: "1px solid #999",
borderRadius: "6px",
fontSize: "16px",
boxSizing: "border-box" as const,
color: "#000",
background: "white",
}

const buttonStyle = {
width: "100%",
padding: "10px",
border: "1px solid #2d4f7c",
borderRadius: "6px",
background:
"linear-gradient(#6d84a2,#2d4f7c)",
color: "white",
fontWeight: "bold",
fontSize: "16px",
}
