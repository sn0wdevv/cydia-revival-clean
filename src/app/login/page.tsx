export default function LoginPage() {
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
          Cydia Login
        </div>

        <div style={{ padding: "20px" }}>

          <input
            type="email"
            placeholder="Email"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "6px",
              border: "1px solid #a8a8a8",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
          />

          <input
            type="password"
            placeholder="Password"
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "18px",
              borderRadius: "6px",
              border: "1px solid #a8a8a8",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
          />

          <button style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #2a5d94",
            background: "linear-gradient(#5f95d3, #2d6fb7)",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            Login
          </button>

          <div style={{
            marginTop: "18px",
            textAlign: "center",
            fontSize: "15px"
          }}>
            <a
              href="/register"
              style={{
                color: "#2d6fb7",
                textDecoration: "none"
              }}
            >
              Create Account
            </a>
          </div>

        </div>
      </div>
    </main>
  )
}