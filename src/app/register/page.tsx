"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkSession()
  }, [])

  async function checkSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      window.location.href = "/account"
    }
  }

  async function handleRegister() {
    if (!username || !email || !password) {
      alert("Please fill all fields.")
      return
    }

    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          username: username,
        })

      if (profileError) {
        alert(profileError.message)
        setLoading(false)
        return
      }

      window.location.href = "/account"
    }

    setLoading(false)
  }

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
            fontSize: "24px",
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

          <button onClick={handleRegister} style={buttonStyle}>
            {loading ? "Creating..." : "Register"}
          </button>

          <div
            style={{
              textAlign: "center",
              marginTop: "18px",
            }}
          >
            <a
              href="/login"
              style={{
                color: "#2f6db2",
                textDecoration: "none",
                fontSize: "15px",
              }}
            >
              Back to Login
            </a>
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