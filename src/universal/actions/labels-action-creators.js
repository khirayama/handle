import Label from 'universal/repositories/label';

export function fetchLabels() {
  Label.fetch().then((res) => {
    console.log(res);
  });
}

export function createLabel() {
  Label.create().then((res) => {
    console.log(res);
  });
}

export function updateLabel() {
  Label.create().then((res) => {
    console.log(res);
  });
}

export function deleteLabel() {
  Label.delete().then((res) => {
    console.log(res);
  });
}
