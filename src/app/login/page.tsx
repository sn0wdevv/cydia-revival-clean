export default function LoginPage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#f5f5f5",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial"
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "12px",
        width: "400px",
        boxShadow: "0 0 20px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{
          marginBottom: "20px",
          fontSize: "32px"
        }}>
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button style={{
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: "8px",
          background: "#2d89ef",
          color: "white",
          fontSize: "16px",
          cursor: "pointer"
        }}>
          Login
        </button>
      </div>
    </main>
  )
}