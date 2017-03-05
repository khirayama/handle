import {Label, Task} from 'models';

function omit(label) {
  return {
    id: label.id,
    name: label.name,
    priority: label.priority,
    visibled: label.visibled,
    createdAt: label.createdAt,
    updatedAt: label.updatedAt,
  };
}

export function indexLabelsHandler(req, res) {
  Label.findAll({
    where: {userId: req.user.id},
    order: [['priority', 'ASC']],
  }).then(labels => {
    res.json(labels.map(label => {
      return omit(label);
    }));
  });
}

export function createLabelHandler(req, res) {
  Label.create({
    userId: req.user.id,
    name: req.body.name,
    priority: req.body.priority,
    visibled: true,
  }).then(label => {
    res.json(omit(label));
  });
}

export function updateLabelHandler(req, res) {
  Label.findById(req.params.id).then(label => {
    label.update({
      name: (req.body.name === undefined) ? label.name : req.body.name,
      priority: (req.body.priority === undefined) ? label.priority : req.body.priority,
      visibled: (req.body.visibled === undefined) ? label.visibled : req.body.visibled,
    }).then(() => {
      res.json(omit(label));
    });
  });
}

export function destroyLabelHandler(req, res) {
  Label.findById(req.params.id).then(label => {
    Label.findAll({
      where: {
        userId: req.user.id,
        priority: {
          $gt: label.priority,
        },
      },
    }).then(labels => {
      labels.forEach(label_ => {
        label_.update({priority: label_.priority - 1});
      });
    });

    Task.findAll({
      where: {
        labelId: label.id,
      },
    }).then(tasks => {
      tasks.forEach(task => {
        task.destroy();
      });
    });

    label.destroy().then(destroyedLabel => {
      res.json(omit(destroyedLabel));
    });
  });
}

export function updateLabelsHandler(req, res) {
  const labels = req.body;

  labels.forEach(newLabel => {
    Label.findById(newLabel.id).then(label => {
      label.update({
        name: (newLabel.name === undefined) ? label.name : newLabel.name,
        priority: (newLabel.priority === undefined) ? label.priority : newLabel.priority,
        visibled: (newLabel.visibled === undefined) ? label.visibled : newLabel.visibled,
      });
    });
  });
  res.json();
}
