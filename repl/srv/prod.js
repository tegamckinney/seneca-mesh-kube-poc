const Seneca = require('seneca')

const SERVICE_NAME = 'demo-repl'

const opts = {
  seneca: {
    tag: SERVICE_NAME
  },
  repl: {
    host: '@eth0',
    port: 10000
  }
}

function runningPods (pod) {
  return pod.status === 'Running'
}

function bases (pod) {
  return pod.labels.domain === 'seneca-base'
}

function pickIp (pod) {
  return pod.ip
}

function addPort (ip) {
  return ip + ':39000'
}

const service = Seneca(opts.seneca)
  .test('print')
  .use('kubernetes', {
    namespace: 'gum-labs',
    k8s_url: process.env.KUBERNETES_SERVICE_HOST,
    log: console.log
  })
  .use('seneca-repl', opts.mesh)

service.ready(function () {
  const kubernetes = service.options().plugin.kubernetes
  console.log(kubernetes)

  service.use('mesh', {
    port: 39000,
    base: true,
    pin: 'cmd:test',
    host: kubernetes.myip,
    bases: kubernetes.pods
      .filter(bases)
      .filter(runningPods)
      .map(pickIp)
      .map(addPort)
  })

  console.log('Seneca up and running')
})
