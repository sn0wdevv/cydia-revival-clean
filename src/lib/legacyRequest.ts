export function legacyRequest(
url: string,
body: any,
callback: (
success: boolean,
data: any
) => void
) {
try {
var xhr =
new XMLHttpRequest()


xhr.open(
  "POST",
  url,
  true
)

xhr.setRequestHeader(
  "Content-Type",
  "application/json"
)

xhr.onreadystatechange =
  function () {
    if (
      xhr.readyState === 4
    ) {
      try {
        var response =
          JSON.parse(
            xhr.responseText
          )

        callback(
          xhr.status >= 200 &&
            xhr.status <
              300,
          response
        )
      } catch (e) {
        callback(false, null)
      }
    }
  }

xhr.send(
  JSON.stringify(body)
)


} catch (e) {
callback(false, null)
}
}
