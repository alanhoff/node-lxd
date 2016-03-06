'use strict'

let HttpClient = require('./http-client')

/**
 * Manage server certificates
 * @extends {HttpClient}
 */
class Certificates extends HttpClient {
  /**
   * @constructs Certificates
   * @param {Object} options General configuration options
   * @param {Object} options.http configurations for HttpClient
   */
  constructor (options) {
    super(options.http)
  }

  /**
   * Retrieve a list of certificates
   * @return {Promise} A promise that resolves to an array of certificates
   */
  list () {
    return this._httpRequest('GET', '/1.0/certificates')
    .then((response) => response.metadata)
    .map((certificate) => certificate.replace('/1.0/certificates/', ''))
  }

  /**
   * Retrieve info about a certificate
   * @param {String} fingerprint The SHA252 certificate's fingerprint
   * @return {Promise} A promise that resolves to the certificate info
   */
  get (fingerprint) {
    return this._httpRequest('GET', `/1.0/certificates/${fingerprint}`)
    .then((response) => response.metadata)
  }

  /**
   * Adds a new trusted certificate in the cerver
   * @param {Object} data The certificate data to be inserted
   * @return {Promise} A promise that resolves when the certificate has been
   * added
   */
  add (data) {
    return this._httpRequest('POST', '/1.0/certificates', data)
  }

  /**
   * Removes a trusted certificate from the server
   * @param {String} fingerprint The certificate's SHA256 fingerprint
   * @return {Promise} A promise that resolves when the certificate has been
   * removed
   */
  remove (fingerprint) {
    return this._httpRequest('DELETE', `/1.0/certificates/${fingerprint}`)
  }
}

module.exports = Certificates
