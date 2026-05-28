"use client"

import { useState } from "react"

export default function LegacyRegisterPage() {
const [email, setEmail] =
useState("")

const [password, setPassword] =
useState("")

const [username, setUsername] =
useState("")

async function register() {
try {
const response =
await fetch(
"/api/legacy-register",
{
method: "POST",


        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email,
          password,
          username,
        }),
      }
    )

  const data =
    await response.json()

  if (!data.success) {
    alert(
      data.error ||
        "Registration failed"
    )

    return
  }

  localStorage.setItem(
    "legacy_uid",
    data.uid
  )

  window.location.href =
    "/legacy/account"
} catch {
  alert(
    "Connection error"
  )
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
maxWidth: "400px",
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
      Create Account
    </div>

    <div
      style={{
        padding: "15px",
      }}
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(
            e.target.value
          )
        }
        style={inputStyle}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        style={inputStyle}
      />

      <button
        onClick={register}
        style={buttonStyle}
      >
        Register
      </button>

      <a
        href="/legacy/login"
        style={{
          display: "block",

          marginTop: "16px",

          textAlign: "center",

          color: "#2d4f7c",

          textDecoration: "none",

          fontWeight: "bold",
        }}
      >
        Already have an account?
      </a>

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
