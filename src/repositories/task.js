import {Collection} from 'libs/micro-repository';

class Task extends Collection {
  constructor() {
    const hostname = (process.env.NODE_ENV === 'production') ? process.env.HOSTNAME : 'http://0.0.0.0:3000';
    super(`${hostname}/api/v1/tasks`);
  }
}

export default new Task();
