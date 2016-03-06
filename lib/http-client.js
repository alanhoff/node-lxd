'use strict'

let request = require('request-promise')
let _ = require('lodash')

/**
 * HTTP client for accessing the remote daemon
 * @example
 * let client = new HttpClient({
 *   baseUrl: 'https://localhost'
 * })
 *
 * // Send some JSON data
 * client.request('POST', '/my-endpoint', { foo: 'bar' })
 * .then((response) => console.log(response))
 */
class HttpClient {

  /**
   * When creating a new HttpClient you can pass any options that the npm module
   * request would accept
   * @constructs HttpClient
   * @param {Object} config Configurations to be passed to request
   */
  constructor (config) {
    /**
     * Default configurations for the http client
     * @type {Object}
     * @protected
     */
    this._httpDefaults = request.defaults(config)
  }

  /**
   * Emit a new request to the server using the default configuration
   * @param {String} method Any accepted HTTP method
   * @param {String} [uri='/1.0'] The path to be accessed
   * @param {Object} [data] The request body to be sent as JSON
   * @protected
   * @return {Promise} A promise that fulfills to the response body already
   * properly parsed as JSON
   */
  _httpRequest (method, uri, data) {
    // Check if uri isn't present
    if (_.isPlainObject(uri)) {
      data = uri
      uri = null
    }

    return this._httpDefaults({
      method,
      uri: uri || '/1.0',
      json: data || true
    })
  }
}

module.exports = HttpClient
