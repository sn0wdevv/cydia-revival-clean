"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function PayPage() {
  const params = useParams()

  const code = params.code as string

  const [loading, setLoading] = useState(true)

  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    loadSession()
  }, [])

  async function loadSession() {
    const { data } = await supabase
      .from("purchase_sessions")
      .select("*")
      .eq("payment_code", code)
      .single()

    if (data) {
      setSession(data)
    }

    setLoading(false)
  }

  async function startCheckout() {
    if (!session) return

    const res = await fetch(
      "/api/stripe/create-checkout",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          payment_code: session.payment_code,
        }),
      }
    )

    const data = await res.json()

    if (data.checkout_url) {
      window.location.href = data.checkout_url
    } else {
      alert("Failed to create checkout.")
    }
  }

  if (loading) {
    return null
  }

  if (!session) {
    return (
      <main
        style={{
          padding: "40px",
          fontFamily: "Helvetica",
        }}
      >
        Invalid payment session.
      </main>
    )
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
          Purchase Package
        </div>

        <div style={{ padding: "18px" }}>
          <div style={infoBox}>
            Package: {session.package_name}
          </div>

          <div style={infoBox}>
            Price: ${session.price}
          </div>

          <button
            onClick={startCheckout}
            style={buttonStyle}
          >
            Buy Package
          </button>

          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              color: "#666",
              fontSize: "13px",
            }}
          >
            cydia.sn0wcode.com
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