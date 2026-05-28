"use client"

export const dynamic = "force-dynamic"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()

  const code = searchParams.get("code")

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    completePurchase()
  }, [])

  async function completePurchase() {
    if (!code) return

    await supabase
      .from("purchase_sessions")
      .update({
        completed: true,
        payment_status: "completed",
      })
      .eq("payment_code", code)

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
          Payment Completed
        </div>

        <div style={{ padding: "18px" }}>
          <div
            style={{
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #aaa",
              background: "white",
              color: "#333",
              fontSize: "16px",
            }}
          >
            {loading
              ? "Completing purchase..."
              : "Your package purchase was successful."}
          </div>

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