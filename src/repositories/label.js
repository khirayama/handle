import {Collection} from 'libs/micro-repository';

class Label extends Collection {
  constructor() {
    const hostname = (process.env.NODE_ENV === 'production') ? process.env.HOSTNAME : 'http://0.0.0.0:3000';
    super(`${hostname}/api/v1/labels`);
  }
}

export default new Label();
