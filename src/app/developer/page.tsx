"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

interface PackageData {
  id: string
  bundle_id: string
  name: string
  is_paid: boolean
  price: number
}

export default function DeveloperPage() {
  const router = useRouter()

  const [packages, setPackages] = useState<PackageData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPackages()
  }, [])

  async function loadPackages() {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      router.push("/login?next=/developer")
      return
    }

    const { data, error } = await supabase
      .from("packages")
      .select(`
        id,
        bundle_id,
        name,
        is_paid,
        price
      `)
      .eq("developer_id", session.user.id)
      .order("created_at", { ascending: false })

    if (!error && data) {
      setPackages(data)
    }

    setLoading(false)
  }

  if (loading) {
    return null
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
            textAlign: "center",
          }}
        >
          Developer Center
        </div>

        <div
          style={{
            background: "#efefef",
            border: "1px solid #b5b5b5",
            borderTop: "none",
            borderRadius: "0 0 10px 10px",
            overflow: "hidden",
          }}
        >
          <Link
            href="/developer/upload"
            style={topButton}
          >
            Publish Package
          </Link>

          <Link
            href="/packages"
            style={topButton}
          >
            Browse Packages
          </Link>

          <Link
            href="/purcharses"
            style={topButton}
          >
            Purchased Packages
          </Link>

          <div
            style={{
              padding: "16px",
              background: "#dfe7f2",
              borderTop: "1px solid #bbb",
              borderBottom: "1px solid #bbb",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            My Packages
          </div>

          {packages.length === 0 ? (
            <div
              style={{
                padding: "20px",
                color: "#666",
                textAlign: "center",
              }}
            >
              No packages published.
            </div>
          ) : (
            packages.map((pkg) => (
              <Link
                key={pkg.id}
                href={`/package/${pkg.bundle_id}`}
                style={packageStyle}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "17px",
                    color: "#000",
                  }}
                >
                  {pkg.name}
                </div>

                <div
                  style={{
                    marginTop: "4px",
                    color: "#666",
                    fontSize: "14px",
                  }}
                >
                  {pkg.bundle_id}
                </div>

                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "14px",
                    color: pkg.is_paid
                      ? "#2f6db2"
                      : "#4caf50",
                  }}
                >
                  {pkg.is_paid
                    ? `$${pkg.price}`
                    : "FREE"}
                </div>
              </Link>
            ))
          )}

          <div
            style={{
              textAlign: "center",
              padding: "20px",
              color: "#777",
              fontSize: "13px",
            }}
          >
            Cydia Revival Developer Center
            <br />
            by sn0wcode
          </div>
        </div>
      </div>
    </main>
  )
}

const topButton = {
  display: "block",
  padding: "18px",
  borderBottom: "1px solid #ccc",
  background: "white",
  color: "#000",
  textDecoration: "none",
  fontSize: "17px",
}

const packageStyle = {
  display: "block",
  padding: "16px",
  borderBottom: "1px solid #ccc",
  background: "white",
  textDecoration: "none",
}