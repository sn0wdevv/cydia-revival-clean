"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function LegacyHomePage() {
const [loggedIn, setLoggedIn] =
useState(false)

const [username, setUsername] =
useState("")

useEffect(() => {
checkSession()
}, [])

async function checkSession() {
const {
data: { session },
} = await supabase.auth.getSession()


if (!session) return

setLoggedIn(true)

const { data } = await supabase
  .from("profiles")
  .select("username")
  .eq("id", session.user.id)
  .single()

if (data) {
  setUsername(data.username)
}


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
Cydia Revival </div>


      <div
        style={{
          padding: "16px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            color: "#000",
            fontWeight: "bold",
            marginBottom: "8px",
          }}
        >
          Welcome to Cydia
        </div>

        <div
          style={{
            color: "#666",
            marginBottom: "14px",
          }}
        >
          by sn0wcode
        </div>

        {loggedIn ? (
          <a
            href="/legacy/account"
            style={buttonStyle}
          >
            Logged in as {username}
          </a>
        ) : (
          <a
            href="/legacy/login"
            style={buttonStyle}
          >
            Sign In
          </a>
        )}
      </div>
    </div>

    <div
      style={{
        background: "#f2f2f2",
        border: "1px solid #999",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "16px",
      }}
    >
      <a
        href="/legacy/purchases"
        style={cellStyle}
      >
        Installable Purchases
      </a>

      <a
        href="/legacy/developer"
        style={cellStyle}
      >
        Developer Center
      </a>

      <a
        href="/legacy/devices"
        style={cellStyle}
      >
        Linked Devices
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
      <div
        style={{
          padding: "14px",
          background: "white",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            color: "#000",
            marginBottom: "4px",
          }}
        >
          Cydia Revival Legacy
        </div>

        <div
          style={{
            color: "#666",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          A modern recreation of the
          original Cydia Store and
          Account system for legacy
          iOS devices.
        </div>
      </div>
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

const buttonStyle = {
display: "block",
width: "100%",
padding: "10px",
borderRadius: "6px",
border: "1px solid #2d4f7c",
background:
"linear-gradient(#6d84a2,#2d4f7c)",
color: "white",
textDecoration: "none",
textAlign: "center" as const,
fontWeight: "bold",
boxSizing: "border-box" as const,
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
