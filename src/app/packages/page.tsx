"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

interface PackageData {
  id: string
  bundle_id: string
  name: string
  author: string
  description: string
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<PackageData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPackages()
  }, [])

  async function loadPackages() {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
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
          Packages
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
          {packages.length === 0 ? (
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                color: "#666",
              }}
            >
              No packages available.
            </div>
          ) : (
            packages.map((pkg) => (
              <Link
                key={pkg.id}
                href={`/package/${pkg.bundle_id}`}
                style={{
                  display: "block",
                  padding: "16px",
                  borderBottom: "1px solid #ccc",
                  background: "white",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  {pkg.name}
                </div>

                <div
                  style={{
                    color: "#666",
                    marginTop: "4px",
                    fontSize: "14px",
                  }}
                >
                  {pkg.bundle_id}
                </div>

                <div
                  style={{
                    color: "#444",
                    marginTop: "6px",
                    fontSize: "14px",
                  }}
                >
                  by {pkg.author || "Unknown"}
                </div>
              </Link>
            ))
          )}

          <div
            style={{
              textAlign: "center",
              padding: "18px",
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