// const dns = require('dns');
const dnsPacket = require('dns-packet'); // 外部包 需要安装
const dgram = require('dgram');

async function resolveIPv4(dnsRequest) {
  const domain = dnsRequest.questions[0].name;
  const regex = /(((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3})\./;
  const match = regex.exec(domain);

  let ip = match ? match[1] : null;

  if (!ip) {
    return dnsPacket.encode({
      type: 'response',
      id: dnsRequest.id,
      // flags: dnsPacket.CHECKING_DISABLED,
      questions: dnsRequest.questions,
      // answers: [],
    });
  }

  return dnsPacket.encode({
    type: 'response',
    id: dnsRequest.id,
    flags: dnsPacket.RECURSION_AVAILABLE,
    questions: dnsRequest.questions,
    answers: [{
      type: 'A',
      class: 'IN',
      name: domain,
      ttl: 3600,
      flush: false,
      data: ip,
    }]
  });
}

const socket = dgram.createSocket('udp4');

socket.on('listening', () => {
  const address = socket.address();
  console.log(`DNS server listening on ${address.address}:${address.port}`);
});

socket.on('message', async (message, remote) => {
  try{
    const dnsRequest = dnsPacket.decode(message);
    const ipv4Response = await resolveIPv4(dnsRequest);
  
    socket.send(ipv4Response, 0, ipv4Response.length, remote.port, remote.address, (error) => {
      if (error) {
        console.error('Failed to send DNS response:', error);
      } else {
        console.log('DNS response sent to', remote.address, remote.port);
      }
    });
  }catch(e) {
    console.error(e);
  }
});

socket.bind(process.env.DNS_SERVER_PORT || 53, '0.0.0.0');

const clean = async () => {
  console.log('beforeExit4: cleaned');
  process.exit();
}
  
process.on('SIGTERM', () => {
  clean();
});

process.on('SIGINT', () => {
  clean();
});