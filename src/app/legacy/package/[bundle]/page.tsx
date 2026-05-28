"use client"

import { useEffect, useState } from "react"

export default function LegacyPackagePage(
props: any
) {
const [loading, setLoading] =
useState(true)

const [pkg, setPkg] =
useState<any>(null)

const [owned, setOwned] =
useState(false)

useEffect(() => {
loadPackage()
}, [])

async function loadPackage() {
try {
const uid =
localStorage.getItem(
"legacy_uid"
)


  const response =
    await fetch(
      "/api/legacy-package",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          uid,
          bundle_id:
            props.params.bundle,
        }),
      }
    )

  const data =
    await response.json()

  if (!data.success) {
    alert(
      "Package not found"
    )

    return
  }

  setPkg(data.package)
  setOwned(data.owned)

  setLoading(false)
} catch {
  alert(
    "Connection error"
  )
}


}

if (loading) {
return (
<main
style={{
background: "#c5ccd4",
minHeight: "100vh",
padding: "20px",
fontFamily: "Helvetica",
color: "#000",
}}
>
Loading... </main>
)
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
        {pkg.name}
      </div>

      <div
        style={{
          padding: "16px",
        }}
      >
        <div
          style={{
            color: "#000",
            fontWeight: "bold",
            marginBottom: "6px",
          }}
        >
          Bundle ID
        </div>

        <div
          style={{
            color: "#666",
            marginBottom: "16px",
          }}
        >
          {pkg.bundle_id}
        </div>

        <div
          style={{
            color: "#000",
            fontWeight: "bold",
            marginBottom: "6px",
          }}
        >
          Price
        </div>

        <div
          style={{
            color: "#666",
            marginBottom: "16px",
          }}
        >
          ${pkg.price}
        </div>

        {owned ? (
          <div style={ownedStyle}>
            Purchased
          </div>
        ) : (
          <button
            style={buyButton}
          >
            Purchase Package
          </button>
        )}

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
  </div>
</main>


)
}

const buyButton = {
width: "100%",
padding: "12px",
border: "1px solid #2f7c2d",
borderRadius: "6px",
background:
"linear-gradient(#6db26d,#2d7c2d)",
color: "white",
fontWeight: "bold",
fontSize: "16px",
}

const ownedStyle = {
width: "100%",
padding: "12px",
border: "1px solid #666",
borderRadius: "6px",
background:
"linear-gradient(#999,#666)",
color: "white",
textAlign: "center" as const,
fontWeight: "bold",
}
