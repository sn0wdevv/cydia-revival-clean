export default function AccountPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h1>Cydia Account</h1>

        <p>
          Cydia Revival account system is currently in development.
        </p>

        <button
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            background: "#2d89ef",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Coming Soon
        </button>
      </div>
    </main>
  );
}