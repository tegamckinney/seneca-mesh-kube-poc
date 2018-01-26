const Seneca = require('seneca')

const SERVICE_NAME = 'monitor'

const opts = {
  seneca: {
    tag: SERVICE_NAME
  }
}

Seneca(opts.seneca)
  .use('mesh', {
    monitor: true
  })
