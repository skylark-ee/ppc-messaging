# PPC-Messaging
Tiny library to facilitate public/private key crypto and use it for encrypted messaging between hosts using `node.js`.

## Usage

Embed the library and use the below methods. For an example, see `example.js`, or run `npm run test` to see it in action. You can use `npm run generate-keys` to generate RSA public-private key pairs.

## Methods

**`encryptMessage(clientId, publicKey, message)`**

Encrypts the message using the provided public key. Embeds secret `clientId` in the message, which is used by the server to encrypt its response.

Example:
```javascript
const ppc = require("ppc-messaging")

let msg = ppc.encryptMessage(cid, pubkey, {
  redirect_to: "https://notes.skylark.ee/auth"
})

console.log("Encrypted message:", msg)
```

---

**`decryptMessage(privateKey, message)`**

Possessing the private key decrypts the encrypted message.

Example:
```javascript
const ppc = require("ppc-messaging")

let decmsg = ppc.decryptMessage(privkey, msg)

console.log("Decrypted message:", decmsg)
```

---

**`encryptResponse(messageId, clientId, message)`**

Creates an encrypted response, in reply to the specified `messageId`. It uses the supplied `clientId` to encrypt the message.

Example:
```javascript
const ppc = require("ppc-messaging")

let resp = ppc.encryptResponse(decmsg.msg_id, decmsg.client_id, {
  session_id: sid
})

console.log("Encrypted response:", resp)
```

---

**`function decryptResponse(clientId, message)`**

Decrypts a received response using the supplied `clientId`.

Example:
```javascript
const ppc = require("ppc-messaging")

let decresp = ppc.decryptResponse(cid, resp)

console.log("Decrypted response:", decresp)
```
