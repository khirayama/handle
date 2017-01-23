import os from 'os';

export default function getLocalAddress() {
  const interfaces = {
    ipv4: [],
    ipv6: [],
  };
  const networkInterfaces = os.networkInterfaces();

  Object.keys(networkInterfaces).forEach(key => {
    networkInterfaces[key].forEach(details => {
      if (!details.internal) {
        switch (details.family) {
          case 'IPv4': {
            interfaces.ipv4.push({
              name: key,
              address: details.address,
            });
            break;
          }
          case 'IPv6': {
            interfaces.ipv6.push({
              name: key,
              address: details.address,
            });
            break;
          }
          default: {
            break;
          }
        }
      }
    });
  });
  return interfaces;
}
