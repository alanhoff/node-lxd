'use strict'

let expect = require('chai').expect

let Config = require('../../lib/config')
let config

beforeEach(() => {
  config = new Config({
    http: require('../fixtures/http-client')
  })
})

describe('config', () => {
  it('should retrieve server configuration', () => {
    return config.server()
    .then((server) => {
      expect(server.auth).to.equal('trusted')
    })
  })

  it('should set and retrieve configuration', () => {
    return config.set({ 'images.remote_cache_expiry': '50' })
    .then(() => config.get())
    .then((config) => {
      expect(config['images.remote_cache_expiry']).to.equal('50')
    })
  })

  it('should unset configuration', () => {
    return config.set({ 'images.remote_cache_expiry': '50' })
    .then(() => config.unset('images.remote_cache_expiry'))
    .then(() => config.get())
    .then((config) => {
      expect(config).to.not.have.key('images.remote_cache_expiry')
    })
  })
})
