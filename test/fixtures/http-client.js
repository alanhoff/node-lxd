'use strict'

let fs = require('fs')

module.exports = {
  baseUrl: 'https://ubuntu:8443',
  strictSSL: false,
  agentOptions: {
    pfx: fs.readFileSync('temp/server.p12')
  }
}
