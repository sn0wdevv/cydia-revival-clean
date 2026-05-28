"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

interface Purchase {
  id: string
  purchased_at: string
  packages: {
    name: string
    bundle_id: string
    author: string
  }[]
}

export default function PurchasesPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [purchases, setPurchases] = useState<Purchase[]>([])

  useEffect(() => {
    loadPurchases()
  }, [])

  async function loadPurchases() {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      router.push("/login?next=/purchases")
      return
    }

    const { data, error } = await supabase
      .from("purchases")
      .select(`
        id,
        purchased_at,
        packages (
          name,
          bundle_id,
          author
        )
      `)
      .eq("user_id", session.user.id)

    if (!error && data) {
      setPurchases(data as Purchase[])
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
          Purchased Packages
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
          {purchases.length === 0 ? (
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                color: "#666",
              }}
            >
              No purchases found.
            </div>
          ) : (
            purchases.map((purchase) => (
              <div
                key={purchase.id}
                style={{
                  padding: "16px",
                  borderBottom: "1px solid #ccc",
                  background: "white",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  {purchase.packages[0]?.name}
                </div>

                <div
                  style={{
                    color: "#666",
                    marginTop: "4px",
                    fontSize: "14px",
                  }}
                >
                  {purchase.packages[0]?.bundle_id}
                </div>

                <div
                  style={{
                    color: "#444",
                    marginTop: "6px",
                    fontSize: "14px",
                  }}
                >
                  by {purchase.packages[0]?.author || "Unknown"}
                </div>
              </div>
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