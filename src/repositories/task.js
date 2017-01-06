import {Collection} from 'libs/micro-repository';

class Task extends Collection {
  constructor() {
    const hostname = process.env.HOSTNAME || 'http://0.0.0.0:3000';
    super(`${hostname}/api/v1/tasks`);
  }
}

export default new Task();
