import {Collection} from 'universal/libs/micro-repository';

class Task extends Collection {
  constructor() {
    super('/api/v1/tasks');
  }
}

export default new Task();
