'use strict'

let Bluebird = require('bluebird')
let pem = require('pem')

module.exports = () => {
  return new Bluebird((resolve, reject) => {
    pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
      if (err) return reject(err)

      pem.getFingerprint(keys.certificate, 'sha256', (err, fingerprint) => {
        if (err) return reject(err)

        let fp = fingerprint.fingerprint.replace(/:/g, '').toLowerCase()
        let cert = keys.certificate
        .replace('\n', '')
        .replace('-----BEGIN CERTIFICATE-----', '')
        .replace('-----END CERTIFICATE-----', '')

        resolve([cert, fp])
      })
    })
  })
}
