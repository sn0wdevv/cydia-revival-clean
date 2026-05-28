"use client"

import { useState } from "react"

export default function LegacyLoginPage() {
var [email, setEmail] =
useState("")

var [password, setPassword] =
useState("")

function login() {
alert("login start")


try {
  var xhr =
    new XMLHttpRequest()

  alert("xhr created")

  xhr.open(
    "POST",
    "/api/legacy-login",
    true
  )

  alert("opened")

  xhr.setRequestHeader(
    "Content-Type",
    "application/json"
  )

  xhr.onreadystatechange =
    function () {
      alert(
        "readyState: " +
          xhr.readyState
      )

      if (
        xhr.readyState === 4
      ) {
        alert(
          "status: " +
            xhr.status
        )

        alert(
          "response: " +
            xhr.responseText
        )

        try {
          var data =
            JSON.parse(
              xhr.responseText
            )

          if (
            !data.success
          ) {
            alert(
              "login failed"
            )

            return
          }

          alert(
            "saving uid"
          )

          localStorage.setItem(
            "legacy_uid",
            data.uid
          )

          alert(
            "redirecting"
          )

          window.location.href =
            "/legacy/account"
        } catch (e) {
          alert(
            "json error: " +
              String(e)
          )
        }
      }
    }

  xhr.send(
    JSON.stringify({
      email: email,
      password: password,
    })
  )

  alert("request sent")
} catch (e) {
  alert(
    "CRASH: " + String(e)
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
Sign In </div>


    <div
      style={{
        padding: "15px",
      }}
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={function (
          e
        ) {
          setEmail(
            e.target.value
          )
        }}
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={function (
          e
        ) {
          setPassword(
            e.target.value
          )
        }}
        style={inputStyle}
      />

      <button
        onClick={login}
        style={buttonStyle}
      >
        Login
      </button>

      <a
        href="/legacy/register"
        style={linkStyle}
      >
        Create Account
      </a>

      <div
        style={footerStyle}
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

const linkStyle = {
display: "block",
marginTop: "16px",
textAlign: "center" as const,
color: "#2d4f7c",
textDecoration: "none",
fontWeight: "bold",
}

const footerStyle = {
textAlign: "center" as const,
marginTop: "20px",
color: "#666",
fontSize: "13px",
}
