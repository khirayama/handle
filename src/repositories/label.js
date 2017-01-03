import {Collection} from 'libs/micro-repository';

class Label extends Collection {
  constructor() {
    super('http://localhost:3000/api/v1/labels');
  }
}

export default new Label();
