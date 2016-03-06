'use strict'

let Config = require('./config')
let Certificates = require('./certificates')

/**
 * Main LXD class for interacting with your LXD endpoint
 * @example
 * let lxd = new LXD({
 *   baseUrl: 'https://localhost/1.0',
 *   strictSSL: false,
 *   agentOptions: {
 *     pfx: fs.readFileSync('client.pfx')
 *   }
 * })
 *
 * let config = yield lxd.config.get()
 */
class LXD {
  /**
   * @param {Object|HttpClient} client A plain object to instantiate a
   * HttpClient or your own HttpClient instance
   * @constructs LXD
   */
  constructor (options) {
    // Instantiate all methods
    this.config = new Config(options)
    this.certificates = new Certificates(options)
  }
}

module.exports = LXD
