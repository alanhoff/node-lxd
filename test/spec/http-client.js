'use strict'

let nock = require('nock')
let expect = require('chai').expect

let HttpClient = require('../../lib/http-client.js')

describe('HTTP client', () => {
  it('should work for receiving JSON data', () => {
    let scope = nock('https://localhost')
    .get('/')
    .reply(200, { foo: 'bar' })

    let client = new HttpClient({
      baseUrl: 'https://localhost'
    })

    return client._httpRequest('GET', '/')
    .then((body) => {
      scope.done()
      expect(body.foo).to.equal('bar')
    })
  })

  it('should work for sending data', () => {
    let scope = nock('https://localhost')
    .post('/')
    .reply(200, (uri, body) => body)

    let client = new HttpClient({
      baseUrl: 'https://localhost'
    })

    return client._httpRequest('POST', '/', { bar: 'foo' })
    .then((body) => {
      scope.done()
      expect(body.bar).to.equal('foo')
    })
  })
})
