const ppc = require("./index.js")

const privkey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpgIBAAKCAQEAoGM7cHSayG3gy8fltBTw7b35dSAK+9YC1/lq9xsJ3kctH72Iv3ivYLp0
fYmtU4M8gaCmVcNNIl1QkjM3FSsXANF+eqV0TvUl8C7vVB3AvVhafY7DdQnDsS2jeXLr2tV/
VIrqOQ68lilK4dbyQk7t5jhVVH3e6Z5MQhiC/QfiWxktt5/yB8F6Pw6LlKkS0LQDT0uGgSV5
xCCn5WqdueUf48l7Wi0o/LV5Yav/LwwFy1kLB96Gl04bJf6V+UxvSK5CgcBE7eHCaxuWsLtp
GN4xfUYkz8sfELe2ck2Tn3eA4K4kz+1sSPyJdT8H0BrFneYZxIpZaJ/mkLVARcndthO/LQID
AQABAoIBAQCDElVjA4fywAjzwDryPiLex1/z3encAPt18Lj/lDMuWdCAne4BO+lnDTlh1n+1
PgzWiqkkcWS57rSHph8fx4UXAB1ysYApfqIwdMrVXTNECc55yY/mN8KbKwbrm4Uv40YZmyTq
2CY6OSifA4AbvFEi0Wq6j9r55InBgjKaAjVz6AYw3M68zZVzHcDVTTSWaBNfeE+o/4KUBNRT
/438/EyNK7usGgMYxjB17GQGyyuf8OdEIn7eqN1ErhgkIkMnBP3LnwSsRs3Rb/SvqFQ/vDMr
IfKekcHfXMc4pfbxz1HljMmC/H9WcS3ftwMCkgylVtmcqqeSpKAmMVls1/4BtDApAoGBANQa
pFEvmoqvF/3FlyFr+zxNN++M+g9eO3+RpZUl1aWqZmO+BxBuhDdZkjpVX8Zz7R6rmkr82CRm
6N1lATT/mdceUemj9VDe5MRVoNARUujVksRroh5ddu8q2gZs+mlBiwYizFXrCYaCCXOq294T
wIzkh/ZlzZhm0g2JZm4edmtLAoGBAMGUoev0/gTZOR5bQ2pCS0WP3jFzrmU/Yb9xh5fbZM9O
7H19IQYGYXinyEXB8Jtn600Icq3CmAQVnO4OKMwEdZcaJG4Hefcf6b2y+0y2vjub9y9UB/ZS
kofLsevSDH/KM1P7f/dU5MtxJRqTj1gA0tXATGWkr5cU0fuh99ZLOzxnAoGBALqPJHB0Wo4Z
LBT+Mswm2jhUAxsk+N2DmPm/9dCWErFAjAa3IieFza2Rj1jXtwIq/Sm47mF+u+5oxfHV4ZXo
LDxWYt4KZL/ZDYbTejsIwdAh6pHxygrDUtVS76ovOKJUECA5g1ke/qXcwsuGQRW4ceh7KkvD
h27BIYjejcXV7Xq5AoGBAJBabPDOzcoBzmVDux729riV0yRfVnIr9JFVcL6eHSu2eAYQFFsw
0OivfVn/iJPqx323SgUnMkMBdvfSWTviK2oVVYszShEtnBkY6erH7032PTru180owBpBnJj1
FtsIhoQe7MscZE0NP5T06pS+cHpzHsVBLKtmHDwgCPelPDQLAoGBAKlj7RWy5NUgdDRS0uGg
hXnEjrOsOmbYkJWfzcnpKYOeK0LrHsiUnzxWVBxS9Ixj3ZJbrOvFnAmqqky5OA5yfknIKmoB
drx6WdHsUBxCaClgAo5ZLn1N+a2yu60C/wPuK4jcnEs2hfhJdxG+KZeBcHdlI5hXDyN9Tu14
bnMFUr3L
-----END RSA PRIVATE KEY-----
`

const pubkey = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAoGM7cHSayG3gy8fltBTw7b35dSAK+9YC1/lq9xsJ3kctH72Iv3ivYLp0fYmt
U4M8gaCmVcNNIl1QkjM3FSsXANF+eqV0TvUl8C7vVB3AvVhafY7DdQnDsS2jeXLr2tV/VIrq
OQ68lilK4dbyQk7t5jhVVH3e6Z5MQhiC/QfiWxktt5/yB8F6Pw6LlKkS0LQDT0uGgSV5xCCn
5WqdueUf48l7Wi0o/LV5Yav/LwwFy1kLB96Gl04bJf6V+UxvSK5CgcBE7eHCaxuWsLtpGN4x
fUYkz8sfELe2ck2Tn3eA4K4kz+1sSPyJdT8H0BrFneYZxIpZaJ/mkLVARcndthO/LQIDAQAB
-----END RSA PUBLIC KEY-----
`

const cid = `nRXurt5tZ0xbUcWswUoRDdPl1c72EdJIt`
const sid = `RAoGASskTh5mTm2r:2zAq1BbEgX4KVqXykoAWIaeE3OJ2oTV`


// Encrypt message on client-side. Send it over to the server
// (one that holds the private key)
let msg = ppc.encryptMessage(cid, pubkey, {
  redirect_to: "https://notes.skylark.ee/auth"
})
console.log("Encrypted message:", msg.contents)
console.log("Message ID:", msg.message_id)


// Decipher encrypted message on the server-side
// using our private key
let decmsg = ppc.decryptMessage(privkey, msg.contents)
console.log("Decrypted message:", decmsg)


// Use the secret client id, embedded in the original message
// to encrypt our response and send it back to the client
let resp = ppc.encryptResponse(decmsg.msg_id, decmsg.client_id, {
  session_id: sid
})
console.log("Encrypted response:", resp)


// The client receives the response and uses their secret
// client ID to decrypt and view the contents
let decresp = ppc.decryptResponse(cid, resp)
console.log("Decrypted response:", decresp)
