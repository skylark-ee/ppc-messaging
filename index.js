const crypto = require('crypto')


// Exposed module methods
module.exports = {
  encryptMessage, decryptMessage,
  encryptResponse, decryptResponse,
}


// Helper method for SHA-256 digest, used for creating message ids
function sha256sum(message) {
  const hash = crypto.createHash('sha256')
  hash.update(message)
  return hash.digest('hex')
}


// Encrypts the message using the provided public key.
// Embeds secret "clientId" in the message, which is used
// by the server to encrypt its response
function encryptMessage(clientId, publicKey, message) {
  const data = new Buffer(JSON.stringify({
    'msg_id': sha256sum(JSON.stringify(message)),
    'client_id': clientId,
    'message': message
  }), 'utf8')
  const encrypted = crypto.publicEncrypt(publicKey, data)

  return encrypted.toString('base64')
}

// Possessing the private key decrypts the encrypted message
function decryptMessage(privateKey, message) {
  const data = new Buffer(message, 'base64')
  const decrypted = crypto.privateDecrypt(privateKey, data)

  return JSON.parse(decrypted.toString('utf8'))
}

// Creates an encrypted response, in reply to the specified
// message (id). It uses the supplied clientId to encrypt
// the message.
function encryptResponse(messageId, clientId, message) {
  const cipher = crypto.createCipher('aes256', clientId)
  const data = new Buffer(JSON.stringify({
    reply_to: messageId,
    message: message
  }), 'utf8')

  let result = cipher.update(data).toString('base64')
  result += cipher.final('base64')
  return result
}

// Decrypts a received response using the supplied clientId
function decryptResponse(clientId, message) {
  const cipher = crypto.createDecipher('aes256', clientId)
  const data = new Buffer(message, 'base64')

  let result = cipher.update(data).toString('utf8')
  result += cipher.final('utf8')
  return JSON.parse(result)
}
