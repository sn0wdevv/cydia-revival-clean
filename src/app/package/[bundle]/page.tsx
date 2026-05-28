"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

interface PackageData {
  id: string
  bundle_id: string
  name: string
  author: string
  description: string
  is_paid: boolean
  price: number
}

export default function PackagePage() {
  const params = useParams()
  const router = useRouter()

  const [pkg, setPkg] = useState<PackageData | null>(null)

  const [loading, setLoading] = useState(true)
  const [buying, setBuying] = useState(false)
  const [purchased, setPurchased] = useState(false)

  useEffect(() => {
    loadPackage()
  }, [])

  async function loadPackage() {
    const bundle = params.bundle as string

    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("bundle_id", bundle)
      .single()

    if (error || !data) {
      setLoading(false)
      return
    }

    setPkg(data)

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      const { data: purchase } = await supabase
        .from("purchases")
        .select("id")
        .eq("user_id", session.user.id)
        .eq("package_id", data.id)
        .single()

      if (purchase) {
        setPurchased(true)
      }
    }

    setLoading(false)
  }

  async function handleBuy() {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      router.push(`/login?next=/package/${params.bundle}`)
      return
    }

    if (!pkg) return

    setBuying(true)

    const { error } = await supabase
      .from("purchases")
      .insert({
        user_id: session.user.id,
        package_id: pkg.id,
      })

    if (error) {
      alert(error.message)
      setBuying(false)
      return
    }

    setPurchased(true)
    setBuying(false)
  }

  if (loading) {
    return null
  }

  if (!pkg) {
    return (
      <main
        style={{
          background: "#d7dbe0",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Helvetica",
        }}
      >
        Package not found.
      </main>
    )
  }

  return (
    <main
      style={{
        background: "#d7dbe0",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Helvetica",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "linear-gradient(#5b9be6,#2f6db2)",
            color: "white",
            padding: "16px",
            borderRadius: "10px 10px 0 0",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {pkg.name}
        </div>

        <div
          style={{
            background: "#efefef",
            border: "1px solid #b5b5b5",
            borderTop: "none",
            borderRadius: "0 0 10px 10px",
            padding: "20px",
          }}
        >
          <div
            style={{
              marginBottom: "10px",
              color: "#666",
            }}
          >
            {pkg.bundle_id}
          </div>

          <div
            style={{
              marginBottom: "20px",
              color: "#333",
            }}
          >
            by {pkg.author}
          </div>

          <div
            style={{
              marginBottom: "24px",
              lineHeight: "1.6",
              color: "#000",
            }}
          >
            {pkg.description}
          </div>

          {purchased ? (
            <div
              style={{
                background: "#4caf50",
                color: "white",
                padding: "14px",
                borderRadius: "8px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Purchased
            </div>
          ) : pkg.is_paid ? (
            <button
              onClick={handleBuy}
              disabled={buying}
              style={buttonStyle}
            >
              {buying
                ? "Purchasing..."
                : `Buy for $${pkg.price}`}
            </button>
          ) : (
            <div
              style={{
                background: "#2f6db2",
                color: "white",
                padding: "14px",
                borderRadius: "8px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              FREE PACKAGE
            </div>
          )}

          <div
            style={{
              textAlign: "center",
              marginTop: "24px",
              color: "#777",
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

const buttonStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "8px",
  border: "1px solid #2f5d92",
  background: "linear-gradient(#5b9be6,#2f6db2)",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
}