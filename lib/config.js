'use strict'

let _ = require('lodash')

let HttpClient = require('./http-client')

/**
 * Server configuration and environment information
 * @extends {HttpClient}
 */
class Config extends HttpClient {
  /**
   * @constructs Config
   * @param {Object} options General configuration options
   * @param {Object} options.http configurations for HttpClient
   */
  constructor (options) {
    super(options.http)
  }

  /**
   * Return the whole server information
   * @return {Promise} A promise that resolves to the server information
   */
  server () {
    return this._httpRequest('GET')
    .then((response) => response.metadata)
  }

  /**
   * Retrieve the server configuration
   * @return {Promise} A promise that resolves to the server configuration
   */
  get () {
    return this.server()
    .then((server) => server.config)
  }

  /**
   * Unset parameters from server configuration
   * @param {...String} arguments A list parameters that you want to unset
   * @return {Promise} A promise that resolves when the config has been unset
   */
  unset () {
    return this.get()
    .then((config) => _.omit(config, _.flatten(Array.from(arguments))))
    .then((config) => this.update(config))
  }

  /**
   * Set one or more configurations in the server
   * @param {Object} data A plain object containing the configuration you want
   * to insert or update in the server
   * @return {Pomise} A promise that resolves when the config has been set
   */
  set (data) {
    return this.get()
    .then((config) => _.merge(config, data))
    .then((config) => this.update(config))
  }

  /**
   * Replaces the whole server configuration for the one provided
   * @param {Object} data The new server configuration
   * @return {Promise} A promise that resolves when the configuration has been
   * replaces
   */
  update (data) {
    return this._httpRequest('PUT', { config: data })
  }
}

module.exports = Config
