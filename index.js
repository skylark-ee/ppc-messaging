const crypto = require('crypto')


// Exposed module methods
module.exports = {
  encryptMessage, decryptMessage,
  encryptResponse, decryptResponse,

  aes256encrypt, aes256decrypt, sha256sum,

  randomHex, randomString,
}


// Helper method for SHA-256 digest, used for creating message ids
function sha256sum(message) {
  const hash = crypto.createHash('sha256')
  hash.update(message)
  return hash.digest('hex')
}

// Helper method for symmetric AES-256 encryption
function aes256encrypt(key, message) {
  const cipher = crypto.createCipher('aes256', key)

  const result = Buffer.concat([
    cipher.update(message, typeof message == 'string' ? 'utf8' : undefined),
    cipher.final()
  ]).toString('base64')

  return result
}

// Helper method for symmetric AES-256 encryption
function aes256decrypt(key, message) {
  const cipher = crypto.createDecipher('aes256', key)

  let result = Buffer.concat([
    cipher.update(new Buffer(message, 'base64')),
    cipher.final()
  ]).toString('utf8')

  return result
}

// Helper method for generating random strings
function randomString(len) {
  const digits = 32+len*len
  return Array(digits).fill(1).map(i => Math.floor(Math.random()*36)).map(n => n.toString(36)).join('').substr(Math.random()*(digits-len),len)
}

// Helper method for generating random keys in hex
function randomHex(len) {
  const digits = 32+len*len
  return Array(digits).fill(1).map(i => Math.floor(Math.random()*16)).map(n => n.toString(16)).join('').substr(Math.random()*(digits-len),len)
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

  const encryptionKey = new Buffer(randomHex(64), 'hex')
  const encryptedData = aes256encrypt(encryptionKey, data)

  const key = crypto.publicEncrypt(publicKey, encryptionKey).toString('base64')

  return key+':'+encryptedData
}

// Possessing the private key decrypts the encrypted message
function decryptMessage(privateKey, message) {
  const parts = message.split(':')

  const key = new Buffer(parts[0], 'base64')
  const data = parts[1]

  const decryptedkey = crypto.privateDecrypt(privateKey, key)

  return JSON.parse(aes256decrypt(decryptedkey, data))
}

// Creates an encrypted response, in reply to the specified
// message (id). It uses the supplied clientId to encrypt
// the message.
function encryptResponse(messageId, clientId, message) {
  return aes256encrypt(clientId,
    JSON.stringify({
      reply_to: messageId,
      message: message
    })
  )
}

// Decrypts a received response using the supplied clientId
function decryptResponse(clientId, message) {
  return JSON.parse(aes256decrypt(clientId, message))
}
