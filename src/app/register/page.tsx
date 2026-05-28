"use client"

import { useState } from "react"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <main
      style={{
        background: "#d7dbe0",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Helvetica",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#efefef",
          border: "1px solid #b5b5b5",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            background: "linear-gradient(#5b9be6,#2f6db2)",
            color: "white",
            textAlign: "center",
            padding: "16px",
            fontSize: "clamp(20px,5vw,28px)",
            fontWeight: "bold",
          }}
        >
          Create Account
        </div>

        <div style={{ padding: "18px" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button style={buttonStyle}>
            Register
          </button>

          <div style={linkContainer}>
            <a href="/login" style={linkStyle}>
              Back to Login
            </a>
          </div>

          <div style={footerStyle}>
            by sn0wcode
          </div>
        </div>
      </div>
    </main>
  )
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  borderRadius: "6px",
  border: "1px solid #aaa",
  fontSize: "16px",
  boxSizing: "border-box" as const,
  background: "white",
  color: "black",
  outline: "none",
}

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #2f5d92",
  background: "linear-gradient(#5b9be6,#2f6db2)",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
}

const linkContainer = {
  textAlign: "center" as const,
  marginTop: "16px",
}

const linkStyle = {
  color: "#2f6db2",
  textDecoration: "none",
  fontSize: "15px",
}

const footerStyle = {
  textAlign: "center" as const,
  marginTop: "20px",
  color: "#666",
  fontSize: "13px",
}