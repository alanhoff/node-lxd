'use strict'

let expect = require('chai').expect

let Certificates = require('../../lib/certificates')
let certGenerator = require('../fixtures/certificate-generator')
let certificates

beforeEach(() => {
  certificates = new Certificates({
    http: require('../fixtures/http-client')
  })
})

describe('certificates', () => {
  it('should retrieve a list of certificates', () => {
    return certificates.list()
    .each((cert) => {
      expect(cert).to.match(/[0-9a-f]/gi)
    })
  })

  it('should retrieve a certificate info', () => {
    return certificates.list()
    .then((certs) => certificates.get(certs[0]))
    .then((cert) => {
      expect(cert).to.have.all.keys('fingerprint', 'type', 'certificate')
    })
  })

  it('should create a certificate', () => {
    return certGenerator()
    .spread((cert, fingerprint) => {
      return certificates.add({
        type: 'client',
        certificate: cert
      })
      .then(() => certificates.get(fingerprint))
      .then((cert) => {
        expect(cert).to.have.all.keys('fingerprint', 'type', 'certificate')
      })
    })
  })

  it('should remove a certificate', () => {
    return certGenerator()
    .spread((cert, fingerprint) => {
      return certificates.add({
        type: 'client',
        certificate: cert
      })
      .then(() => certificates.list())
      .then((certs) => {
        expect(certs).to.contain(fingerprint)
      })
      .then(() => certificates.remove(fingerprint))
      .then(() => certificates.list())
      .then((certs) => {
        expect(certs).to.not.contain(fingerprint)
      })
    })
  })
})
