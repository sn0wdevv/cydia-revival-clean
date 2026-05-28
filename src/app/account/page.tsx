"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AccountPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")

  useEffect(() => {
    loadAccount()
  }, [])

  async function loadAccount() {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      router.push("/login?next=/account")
      return
    }

    setEmail(session.user.email || "")

    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", session.user.id)
      .single()

    if (data) {
      setUsername(data.username)
    }

    setLoading(false)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) {
    return null
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
          My Account
        </div>

        <div style={{ padding: "18px" }}>
          <div style={infoBox}>
            Username: {username}
          </div>

          <div style={infoBox}>
            Email: {email}
          </div>

          <button
            onClick={handleLogout}
            style={logoutButton}
          >
            Logout
          </button>

          <a
            href="/developer"
            style={developerButton}
          >
            Publish Your Own Paid Packages
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

const infoBox = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  borderRadius: "6px",
  border: "1px solid #aaa",
  background: "white",
  color: "#333",
  fontSize: "16px",
  boxSizing: "border-box" as const,
}

const logoutButton = {
  width: "100%",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #8a1e1e",
  background: "linear-gradient(#ef5a5a,#bf2020)",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
}

const developerButton = {
  display: "block",
  width: "100%",
  marginTop: "14px",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #2f5d92",
  background: "linear-gradient(#5b9be6,#2f6db2)",
  color: "white",
  textDecoration: "none",
  textAlign: "center" as const,
  fontWeight: "bold",
  fontSize: "15px",
  boxSizing: "border-box" as const,
}