"use client"

import { useEffect, useState } from "react"

export default function LegacyAccountPage() {
const [loading, setLoading] =
useState(true)

const [email, setEmail] =
useState("")

const [username, setUsername] =
useState("")

useEffect(() => {
loadAccount()
}, [])

async function loadAccount() {
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
      "/api/legacy-account",
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
    window.location.href =
      "/legacy/login"

    return
  }

  setUsername(data.username)
  setEmail(data.email)

  setLoading(false)
} catch {
  alert(
    "Failed to load account"
  )
}


}

function logout() {
localStorage.removeItem(
"legacy_uid"
)


window.location.href =
  "/legacy/login"


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
maxWidth: "400px",
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
        My Account
      </div>

      <div
        style={{
          padding: "16px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "14px",
            background: "#d0d0d0",
            margin:
              "0 auto 14px auto",
            border:
              "1px solid #999",
          }}
        />

        <div
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            color: "#000",
          }}
        >
          {username}
        </div>

        <div
          style={{
            color: "#666",
            marginTop: "4px",
          }}
        >
          {email}
        </div>
      </div>
    </div>

    <div
      style={{
        background: "#f2f2f2",
        border: "1px solid #999",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <a
        href="/legacy/purchases"
        style={cellStyle}
      >
        Installable Purchases
      </a>

      <a
        href="/legacy/devices"
        style={cellStyle}
      >
        Linked Devices
      </a>

      <a
        href="/legacy/developer"
        style={cellStyle}
      >
        Developer Panel
      </a>

      <button
        onClick={logout}
        style={logoutStyle}
      >
        Logout
      </button>
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
fontSize: "17px",
}

const logoutStyle = {
width: "100%",
padding: "14px",
border: "none",
background: "white",
color: "#c00",
fontSize: "17px",
}
