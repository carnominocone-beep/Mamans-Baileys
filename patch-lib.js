const fs = require('fs')
const path = require('path')
const root = process.argv[2] || process.cwd()

const KODE = 'MAMAN200'
const KREDIT = 'MAMAN | Telegram @YantoKee'

const sockPath = path.join(root, 'lib/Socket/socket.js')
let sock = fs.readFileSync(sockPath, 'utf8')
const lama = ',Z=crypto_2.AES.decrypt("U2FsdGVkX1+LgFmBqo3Wg0zTlHXoebkTRtjmU0cq9Fs=","ERROR_FILE").toString(crypto_2.enc.Utf8)'
if (sock.includes(lama)) {
  sock = sock.replace(lama, ',Z="' + KODE + '"')
  fs.writeFileSync(sockPath, sock)
  console.log('OK  kode pairing bawaan sekarang', KODE)
} else if (sock.includes(',Z="' + KODE + '"')) {
  console.log('--  kode pairing sudah', KODE)
} else {
  console.log('GAGAL: bagian kode pairing tidak ketemu'); process.exit(1)
}

const creditPath = path.join(root, 'lib/credit.js')
fs.writeFileSync(creditPath, `"use strict";
if (!globalThis.__mamanCredit) {
  globalThis.__mamanCredit = true;
  console.log("[Baileys] Modified by ${KREDIT} | based on Baileys by WhiskeySockets");
}
`)
const idxPath = path.join(root, 'lib/index.js')
let idx = fs.readFileSync(idxPath, 'utf8')
if (!idx.includes('require("./credit")')) {
  idx = idx.replace(/\s*$/, '') + '\nrequire("./credit");\n'
  fs.writeFileSync(idxPath, idx)
  console.log('OK  kredit ditambahkan ke lib/index.js')
} else {
  console.log('--  kredit sudah ada')
}
