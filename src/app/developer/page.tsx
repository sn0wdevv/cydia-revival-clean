"use client"

import Link from "next/link"

export default function DeveloperPage() {
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
          Developer Center
        </div>

        <div
          style={{
            background: "#efefef",
            border: "1px solid #b5b5b5",
            borderTop: "none",
            borderRadius: "0 0 10px 10px",
            overflow: "hidden",
          }}
        >
          <Link
            href="/developer/upload"
            style={linkStyle}
          >
            Publish Package
          </Link>

          <Link
            href="/packages"
            style={linkStyle}
          >
            Browse Packages
          </Link>

          <Link
            href="/purcharses"
            style={linkStyle}
          >
            Purchased Packages
          </Link>

          <Link
            href="/account"
            style={linkStyle}
          >
            My Account
          </Link>

          <div
            style={{
              textAlign: "center",
              padding: "20px",
              color: "#777",
              fontSize: "13px",
            }}
          >
            Cydia Revival Developer Center
            <br />
            by sn0wcode
          </div>
        </div>
      </div>
    </main>
  )
}

const linkStyle = {
  display: "block",
  padding: "18px",
  borderBottom: "1px solid #ccc",
  background: "white",
  color: "#000",
  textDecoration: "none",
  fontSize: "17px",
}