import {Collection} from 'libs/micro-repository';

class Label extends Collection {
  constructor() {
    const hostname = process.env.HOSTNAME || 'http://0.0.0.0:3000';
    super(`${hostname}/api/v1/labels`);
  }
}

export default new Label();
