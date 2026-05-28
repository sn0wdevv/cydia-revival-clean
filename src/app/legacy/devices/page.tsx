"use client"

import { useEffect, useState } from "react"

export default function LegacyDevicesPage() {
const [devices, setDevices] =
useState<any[]>([])

const [loading, setLoading] =
useState(true)

useEffect(() => {
loadDevices()
}, [])

async function loadDevices() {
try {
const uid =
localStorage.getItem(
"legacy_uid"
)


  if (!uid) {
    window.location.href =
      "/legacy/login"

    return
  }

  const response =
    await fetch(
      "/api/legacy-devices",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          uid,
        }),
      }
    )

  const data =
    await response.json()

  if (!data.success) {
    alert(
      "Failed to load devices"
    )

    return
  }

  setDevices(
    data.devices || []
  )

  setLoading(false)
} catch {
  alert(
    "Connection error"
  )
}


}

function logout() {
localStorage.removeItem(
"legacy_uid"
)


window.location.href =
  "/legacy/login"


}

if (loading) {
return (
<main
style={{
background: "#c5ccd4",
minHeight: "100vh",
padding: "20px",
fontFamily: "Helvetica",
color: "#000",
}}
>
Loading... </main>
)
}

return (
<main
style={{
background: "#c5ccd4",
minHeight: "100vh",
padding: "20px",
fontFamily: "Helvetica",
}}
>
<div
style={{
maxWidth: "420px",
margin: "0 auto",
}}
>
<div
style={{
background: "#f2f2f2",
border: "1px solid #999",
borderRadius: "8px",
overflow: "hidden",
}}
>
<div
style={{
background:
"linear-gradient(#6d84a2,#2d4f7c)",


          color: "white",

          padding: "12px",

          textAlign: "center",

          fontWeight: "bold",

          fontSize: "22px",
        }}
      >
        Linked Devices
      </div>

      {devices.length === 0 && (
        <div
          style={{
            padding: "16px",
            textAlign: "center",
            color: "#666",
          }}
        >
          No linked devices.
        </div>
      )}

      {devices.map((device) => (
        <div
          key={device.id}
          style={deviceStyle}
        >
          <div
            style={{
              color: "#000",
              fontWeight: "bold",
            }}
          >
            {device.device_name ||
              "Unknown Device"}
          </div>

          <div
            style={{
              fontSize: "12px",
              color: "#666",
              marginTop: "4px",
              wordBreak:
                "break-all",
            }}
          >
            {device.device_uuid}
          </div>
        </div>
      ))}
    </div>

    <button
      onClick={logout}
      style={logoutStyle}
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
</main>


)
}

const deviceStyle = {
padding: "14px",
borderBottom: "1px solid #ccc",
background: "white",
}

const logoutStyle = {
width: "100%",
padding: "14px",
marginTop: "16px",
border: "none",
borderRadius: "8px",
background:
"linear-gradient(#ef5a5a,#bf2020)",
color: "white",
fontWeight: "bold",
fontSize: "16px",
}
