"use client"

export default function AccountPage() {
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
            fontSize: "clamp(20px,5vw,28px)",
            fontWeight: "bold",
          }}
        >
          My Account
        </div>

        <div style={{ padding: "18px" }}>
          <div style={infoBox}>
            Username: demo_user
          </div>

          <div style={infoBox}>
            Email: demo@example.com
          </div>

          <button
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #8a1e1e",
              background: "linear-gradient(#ef5a5a,#bf2020)",
              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>

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