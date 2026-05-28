export default function AccountPage() {
  return (
    <main style={{
      background: "#dfe3e8",
      minHeight: "100vh",
      fontFamily: "Helvetica",
      paddingTop: "80px"
    }}>

      <div style={{
        width: "420px",
        margin: "0 auto",
        background: "#f9f9f9",
        border: "1px solid #b5b5b5",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)"
      }}>

        <div style={{
          background: "linear-gradient(#5f95d3, #2d6fb7)",
          color: "white",
          padding: "14px",
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          borderBottom: "1px solid #2a5d94"
        }}>
          My Account
        </div>

        <div style={{ padding: "20px" }}>

          <div style={{
            padding: "12px",
            background: "white",
            border: "1px solid #c8c8c8",
            borderRadius: "6px",
            marginBottom: "12px"
          }}>
            Username: demo_user
          </div>

          <div style={{
            padding: "12px",
            background: "white",
            border: "1px solid #c8c8c8",
            borderRadius: "6px",
            marginBottom: "20px"
          }}>
            Email: demo@example.com
          </div>

          <button style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #8a2b2b",
            background: "linear-gradient(#d35f5f, #b72d2d)",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            Logout
          </button>

        </div>
      </div>
    </main>
  )
}