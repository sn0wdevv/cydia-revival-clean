"use client"

import { useEffect, useState } from "react"

export default function LegacyPurchasesPage() {
const [loading, setLoading] =
useState(true)

const [packages, setPackages] =
useState<any[]>([])

useEffect(() => {
loadPurchases()
}, [])

async function loadPurchases() {
try {
const uid =
localStorage.getItem(
"legacy_uid"
)


  if (!uid) {
    window.location.href =
      "/legacy/login"

    return
  }

  const response =
    await fetch(
      "/api/legacy-purchases",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          uid,
        }),
      }
    )

  const data =
    await response.json()

  if (!data.success) {
    alert(
      "Failed to load purchases"
    )

    return
  }

  setPackages(
    data.purchases || []
  )

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
        Installable Purchases
      </div>

      {packages.length === 0 && (
        <div
          style={{
            padding: "16px",
            color: "#666",
            textAlign: "center",
          }}
        >
          No purchases found.
        </div>
      )}

      {packages.map((pkg) => (
        <a
          key={pkg.id}
          href={`/legacy/package/${pkg.package_id}`}
          style={cellStyle}
        >
          <div
            style={{
              fontWeight: "bold",
              color: "#000",
            }}
          >
            {pkg.package_name}
          </div>

          <div
            style={{
              fontSize: "13px",
              color: "#666",
              marginTop: "2px",
            }}
          >
            {pkg.package_id}
          </div>
        </a>
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

const cellStyle = {
display: "block",
padding: "14px",
borderBottom: "1px solid #ccc",
background: "white",
color: "#000",
textDecoration: "none",
}
