const Seneca = require('seneca')

const SERVICE_NAME = 'demo-repl'

const opts = {
  seneca: {
    tag: SERVICE_NAME
  },
  replPort: 10000
}

const service = Seneca(opts.seneca)
  .use('seneca-repl', {
    port: opts.replPort
  })

service.ready(function () {
  service.use('mesh', {
    base: true
  })
})
