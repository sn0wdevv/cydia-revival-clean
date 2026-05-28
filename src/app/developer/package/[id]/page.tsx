"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function EditPackagePage() {
  const params = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [name, setName] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")

  const [isPaid, setIsPaid] = useState(false)
  const [price, setPrice] = useState("0")

  useEffect(() => {
    loadPackage()
  }, [])

  async function loadPackage() {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      router.push("/login?next=/developer")
      return
    }

    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("id", params.id)
      .eq("developer_id", session.user.id)
      .single()

    if (error || !data) {
      router.push("/developer")
      return
    }

    setName(data.name || "")
    setAuthor(data.author || "")
    setDescription(data.description || "")

    setIsPaid(data.is_paid || false)
    setPrice(String(data.price || 0))

    setLoading(false)
  }

  async function handleSave() {
    setSaving(true)

    const { error } = await supabase
      .from("packages")
      .update({
        name,
        author,
        description,
        is_paid: isPaid,
        price: Number(price),
      })
      .eq("id", params.id)

    if (error) {
      alert(error.message)
      setSaving(false)
      return
    }

    alert("Package updated successfully.")

    setSaving(false)

    router.push("/developer")
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
          Edit Package
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
          <input
            type="text"
            placeholder="Package Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={textareaStyle}
          />

          <div
            style={{
              marginBottom: "16px",
              color: "#000",
              fontSize: "15px",
            }}
          >
            <label>
              <input
                type="checkbox"
                checked={isPaid}
                onChange={(e) => setIsPaid(e.target.checked)}
                style={{ marginRight: "8px" }}
              />

              Paid Package
            </label>
          </div>

          {isPaid && (
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={inputStyle}
            />
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            style={buttonStyle}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

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
}

const textareaStyle = {
  width: "100%",
  minHeight: "140px",
  padding: "12px",
  marginBottom: "18px",
  borderRadius: "6px",
  border: "1px solid #aaa",
  fontSize: "16px",
  boxSizing: "border-box" as const,
  background: "white",
  color: "black",
  resize: "vertical" as const,
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