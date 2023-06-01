



const dnsPacket = require('dns-packet')
const dgram = require('dgram')

const socket = dgram.createSocket('udp4')

const buf = dnsPacket.encode({
  type: 'query',
  id: 1,
  flags: dnsPacket.RECURSION_DESIRED,
  questions: [{
    type: 'A',
    name: 'dnasdasdsadsadasdasdasdasdasdasdasdasdasdasdas.jajabjbj.top'
  }]
})

socket.on('message', message => {
  console.log(JSON.stringify(dnsPacket.decode(message), null, 2)) // prints out a response from google dns
})

socket.send(buf, 0, buf.length, 53, '8.8.8.8')
// socket.send(buf, 0, buf.length, 53, '8.8.8.8')
