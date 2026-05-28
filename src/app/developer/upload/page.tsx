"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function DeveloperUploadPage() {
  const router = useRouter()

  const [bundleId, setBundleId] = useState("")
  const [name, setName] = useState("")
  const [author, setAuthor] = useState("")
  const [description, setDescription] = useState("")

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkSession()
  }, [])

  async function checkSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      router.push("/login?next=/developer/upload")
    }
  }

  async function handlePublish() {
    if (!bundleId || !name) {
      alert("Bundle ID and Name are required.")
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from("packages")
      .insert({
        bundle_id: bundleId,
        name,
        author,
        description,
      })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    alert("Package published successfully.")

    setBundleId("")
    setName("")
    setAuthor("")
    setDescription("")

    setLoading(false)
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
          Developer Upload
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
            placeholder="Bundle ID"
            value={bundleId}
            onChange={(e) => setBundleId(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Package Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            style={inputStyle}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={textareaStyle}
          />

          <button
            onClick={handlePublish}
            disabled={loading}
            style={buttonStyle}
          >
            {loading ? "Publishing..." : "Publish Package"}
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
  outline: "none",
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
  outline: "none",
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