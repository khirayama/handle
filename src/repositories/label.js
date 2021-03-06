import getLocalAddress from 'libs/get-local-address';
import {Collection} from 'libs/micro-repository';

let hostname = '';
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  hostname = process.env.APPLICATION_URL;
} else if (typeof window === 'undefined') {
  const {ipv4} = getLocalAddress();
  const hostname_ = (ipv4[0]) ? ipv4[0].address : 'localhost';

  hostname = `http://${hostname_}:3000`;
}

class Label extends Collection {
  constructor() {
    super(`${hostname}/api/v1/labels`);
  }
}

export default new Label();
