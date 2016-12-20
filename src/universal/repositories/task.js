import {Collection} from 'universal/libs/micro-repository';

class Task extends Collection {
  constructor() {
    super('http://localhost:3000/api/v1/tasks');
  }
}

export default new Task();
