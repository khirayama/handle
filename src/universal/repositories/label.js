import {Collection} from 'universal/libs/micro-repository';

class Label extends Collection {
  constructor() {
    super('/api/v1/labels');
  }
}

export default new Label();
