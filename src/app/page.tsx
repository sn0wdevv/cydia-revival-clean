export default function HomePage() {
  return (
    <main
      style={{
        background: "#d9d9de",
        minHeight: "100vh",
        fontFamily: "Helvetica",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <img
            src="https://cydia.saurik.com/icon@2x/cydia6.png"
            alt="Cydia"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "14px",
              marginRight: "15px",
              flexShrink: 0,
            }}
          />

          <div>
            <div
              style={{
                fontSize: "clamp(18px,5vw,26px)",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Welcome to Cydia
            </div>

            <div
              style={{
                fontSize: "clamp(13px,3vw,16px)",
                color: "#444",
              }}
            >
              by sn0wcode
            </div>
          </div>
        </div>

        {/* Social Buttons */}
        <div
          style={{
            background: "#efefef",
            borderTop: "1px solid #bdbdbd",
            borderBottom: "1px solid #bdbdbd",
            borderRadius: "8px 8px 0 0",
            overflow: "hidden",
          }}
        >
          <a
            href="#"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 16px",
              color: "#000",
              textDecoration: "none",
              borderBottom: "1px solid #cfcfcf",
              fontSize: "16px",
            }}
          >
            <span>Twitter</span>
            <span style={{ color: "#777" }}>›</span>
          </a>

          <a
            href="#"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 16px",
              color: "#000",
              textDecoration: "none",
              fontSize: "16px",
            }}
          >
            <span>Discord</span>
            <span style={{ color: "#777" }}>›</span>
          </a>
        </div>

        {/* Info Box */}
        <div
          style={{
            background: "#f4f4f4",
            border: "1px solid #c8c8c8",
            borderTop: "none",
            padding: "18px",
            fontSize: "15px",
            color: "#000",
            lineHeight: "1.5",
            borderRadius: "0 0 8px 8px",
            wordBreak: "break-word",
          }}
        >
          <p style={{ marginTop: 0 }}>
            Cydia Revival is a modern recreation of the classic
            Cydia account and package system for legacy iOS devices.
          </p>

          <p>
            This project aims to preserve the jailbreak ecosystem
            and restore online functionality of Cydia.
          </p>

          <p style={{ marginBottom: "10px" }}>
            Manage your account, purchases and packages directly
            from your legacy device.
          </p>

          <div
            style={{
              textAlign: "center",
              color: "#666",
              fontSize: "13px",
              marginTop: "20px",
            }}
          >
            =====sn0wcode=====
          </div>
        </div>
      </div>
    </main>
  )
}
