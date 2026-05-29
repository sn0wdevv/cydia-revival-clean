export default function HomePage() {

  return (

    <main
      style={{

        background:
          "#c8ced6 url('https://cydia.saurik.com/cytyle/pinstripes.png')",

        minHeight:
          "100vh",

        fontFamily:
          "Helvetica",

        paddingTop:
          "16px",

      }}
    >

      <div
        style={{

          width:
            "320px",

          margin:
            "0 auto",

        }}
      >

        {/* Header */}

        <div
          style={{

            display:
              "flex",

            alignItems:
              "flex-start",

            marginBottom:
              "10px",

          }}
        >

          <img
            src="/cydia.png"
            alt="Cydia"

            style={{

              width:
                "64px",

              height:
                "64px",

              borderRadius:
                "12px",

              marginRight:
                "12px",

              flexShrink:
                0,

            }}
          />

          <div>

            <div
              style={{

                fontSize:
                  "21px",

                fontWeight:
                  "bold",

                color:
                  "#000",

                lineHeight:
                  "1.05",

                letterSpacing:
                  "-1px",

                textShadow:
                  "0 1px 0 rgba(255,255,255,0.9)",

                WebkitUserSelect:
                  "none",

              }}
            >

              Welcome to Cydia™

            </div>

            <div
              style={{

                fontSize:
                  "13px",

                color:
                  "#666",

                marginTop:
                  "2px",

                textShadow:
                  "0 1px 0 rgba(255,255,255,0.9)",

                WebkitUserSelect:
                  "none",

                fontWeight:
                  "bold",

              }}
            >

              by{" "}

              <a
                href="https://sn0wcode.com"

                style={{

                  color:
                    "#4c566c",

                  textDecoration:
                    "none",

                }}
              >

                sn0wcode

              </a>

            </div>

          </div>

        </div>

        {/* Buttons */}

        <div
          style={{

            display:
              "flex",

            border:
              "1px solid #a7a7a7",

            borderRadius:
              "8px",

            overflow:
              "hidden",

            marginBottom:
              "10px",

            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.8)",

            background:
              "transparent",

          }}
        >

          {/* Reddit */}

          <a
            href="https://reddit.com/r/reloadingdata"

            target="_blank"

            rel="noopener noreferrer"

            style={{

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "space-between",

              width:
                "50%",

              height:
                "43px",

              padding:
                "0 12px",

              textDecoration:
                "none",

              color:
                "#000",

              background:
                "transparent",

              borderRight:
                "1px solid #bdbdbd",

              WebkitUserSelect:
                "none",

            }}
          >

            <div
              style={{

                display:
                  "flex",

                alignItems:
                  "center",

              }}
            >

              <img
                src="/reddit.png"

                alt="Reddit"

                style={{

                  width:
                    "24px",

                  height:
                    "24px",

                  marginRight:
                    "8px",

                  borderRadius:
                    "6px",

                }}
              />

              <span
                style={{

                  fontSize:
                    "17px",

                  fontWeight:
                    "bold",

                  textShadow:
                    "0 1px 0 rgba(255,255,255,0.8)",

                }}
              >

                Reddit

              </span>

            </div>

            <img
              src="/arrow.png"

              alt=">"

              style={{

                width:
                  "8px",

                height:
                  "13px",

                opacity:
                  0.7,

              }}
            />

          </a>

          {/* Twitter */}

          <a
            href="https://x.com/sn0wcodedev"

            target="_blank"

            rel="noopener noreferrer"

            style={{

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "space-between",

              width:
                "50%",

              height:
                "43px",

              padding:
                "0 12px",

              textDecoration:
                "none",

              color:
                "#000",

              background:
                "transparent",

              WebkitUserSelect:
                "none",

            }}
          >

            <div
              style={{

                display:
                  "flex",

                alignItems:
                  "center",

              }}
            >

              <img
                src="/twitter.png"

                alt="Twitter"

                style={{

                  width:
                    "24px",

                  height:
                    "24px",

                  marginRight:
                    "8px",

                  borderRadius:
                    "6px",

                }}
              />

              <span
                style={{

                  fontSize:
                    "17px",

                  fontWeight:
                    "bold",

                  textShadow:
                    "0 1px 0 rgba(255,255,255,0.8)",

                }}
              >

                Twitter

              </span>

            </div>

            <img
              src="/arrow.png"

              alt=">"

              style={{

                width:
                  "8px",

                height:
                  "13px",

                opacity:
                  0.7,

              }}
            />

          </a>

        </div>

        {/* Info Box */}

        <div
          style={{

            background:
              "transparent",

            border:
              "1px solid #a7a7a7",

            borderRadius:
              "8px",

            padding:
              "14px",

            color:
              "#000",

            fontSize:
              "15px",

            lineHeight:
              "1.12",

            textAlign:
              "center",

            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.8)",

            textShadow:
              "0 1px 0 rgba(255,255,255,0.8)",

            WebkitUserSelect:
              "none",

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

          <p>

            ===== sn0wcode =====

          </p>

        </div>

      </div>

    </main>

  )

}