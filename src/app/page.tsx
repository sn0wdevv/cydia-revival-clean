export default function HomePage() {
  return (
    <main style={{
      background: "#d9d9de",
      minHeight: "100vh",
      fontFamily: "Helvetica",
      paddingTop: "10px"
    }}>

      <div style={{
        width: "420px",
        margin: "0 auto"
      }}>

        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          padding: "10px"
        }}>

          <img
            src="https://cydia.saurik.com/icon@2x/cydia6.png"
            alt="Cydia"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "14px",
              marginRight: "15px"
            }}
          />

          <div>
            <div style={{
              fontSize: "18px",
              color: "#000"
            }}>
              Welcome to Cydia
            </div>

            <div style={{
              fontSize: "14px",
              color: "#444"
            }}>
              by sn0wcode
            </div>
          </div>

        </div>

        {/* Social Buttons */}
        <div style={{
          background: "#efefef",
          borderTop: "1px solid #bdbdbd",
          borderBottom: "1px solid #bdbdbd"
        }}>

          <a
            href="#"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              color: "#000",
              textDecoration: "none",
              borderBottom: "1px solid #cfcfcf"
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
              padding: "12px 16px",
              color: "#000",
              textDecoration: "none"
            }}
          >
            <span>Discord</span>
            <span style={{ color: "#777" }}>›</span>
          </a>

        </div>

        {/* Info Box */}
        <div style={{
          background: "#f4f4f4",
          border: "1px solid #c8c8c8",
          borderTop: "none",
          padding: "18px",
          fontSize: "15px",
          color: "#000",
          lineHeight: "1.5"
        }}>

          <p>
            Cydia Revival is a modern recreation of the classic
            Cydia account and package system for legacy iOS devices.
          </p>

          <p>
            This project aims to preserve the jailbreak ecosystem
            and restore online functionality of Cydia.
          </p>

          <p>
            Manage your account, purchases and packages directly
            from your legacy device.


            =====sn0wcode=====
          </p>

        </div>

      </div>

    </main>
  )
}