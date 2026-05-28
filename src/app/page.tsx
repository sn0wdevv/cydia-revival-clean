export default function HomePage() {
  return (
    <main
      style={{
        background:
          "repeating-linear-gradient(to right,#d6d7dc 0px,#d6d7dc 2px,#d3d4d9 2px,#d3d4d9 4px)",
        minHeight: "100vh",
        fontFamily: "Helvetica",
        paddingTop: "10px",
      }}
    >
      <div
        style={{
          width: "285px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: "8px",
          }}
        >
          <img
            src="/cydia.png"
            alt="Cydia"
            style={{
              width: "57px",
              height: "57px",
              borderRadius: "12px",
              marginRight: "12px",
              flexShrink: 0,
            }}
          />

          <div>
            <div
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#000",
                lineHeight: "1.1",
                letterSpacing: "-0.3px",
              }}
            >
              Welcome to Cydia™
            </div>

            <div
              style={{
                fontSize: "13px",
                color: "#444",
                marginTop: "3px",
              }}
            >
              by sn0wcode
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            border: "1px solid #b4b4b4",
            borderRadius: "8px",
            overflow: "hidden",
            background: "#ececec",
            marginBottom: "8px",
          }}
        >
          {/* Facebook */}
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "35px",
              padding: "0 10px",
              textDecoration: "none",
              color: "#000",
              background:
                "linear-gradient(to bottom,#f8f8f8,#dfdfdf)",
              borderBottom: "1px solid #bdbdbd",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="https://cydia.saurik.com/icon/facebook.png"
                alt="Facebook"
                style={{
                  width: "24px",
                  height: "24px",
                  marginRight: "8px",
                }}
              />

              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                Cydia
              </span>
            </div>

            <span
              style={{
                color: "#7a7a7a",
                fontSize: "22px",
                lineHeight: 1,
              }}
            >
              ›
            </span>
          </a>

          {/* Twitter */}
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "35px",
              padding: "0 10px",
              textDecoration: "none",
              color: "#000",
              background:
                "linear-gradient(to bottom,#f8f8f8,#dfdfdf)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="https://cydia.saurik.com/icon/twitter.png"
                alt="Twitter"
                style={{
                  width: "24px",
                  height: "24px",
                  marginRight: "8px",
                }}
              />

              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                sn0wcode
              </span>
            </div>

            <span
              style={{
                color: "#7a7a7a",
                fontSize: "22px",
                lineHeight: 1,
              }}
            >
              ›
            </span>
          </a>
        </div>

        {/* Info Box */}
        <div
          style={{
            background:
              "linear-gradient(to bottom,#efefef,#e2e2e2)",
            border: "1px solid #b4b4b4",
            borderRadius: "8px",
            padding: "12px",
            color: "#000",
            fontSize: "15px",
            lineHeight: "1.12",
            textAlign: "center",
          }}
        >
          <p style={{ marginTop: 0 }}>
            Cydia is an alternative to Apple's
            App Store for "jailbroken" devices,
            at this time including iPhones,
            iPads, and iPod Touches,
            specializing in the distribution
            of all that is not an "app".
          </p>

          <p style={{ marginBottom: 0 }}>
            Cydia is not available in Apple's
            App Store, nor is it a website:
            it is installed on your device
            using a "jailbreaking" tool.
          </p>
        </div>
      </div>
    </main>
  )
}