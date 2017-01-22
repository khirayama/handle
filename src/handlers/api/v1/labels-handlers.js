import {Label} from '../../../../models';

function omitLabel(label) {
  return {
    id: label.id,
    name: label.name,
    priority: label.priority,
    visibled: label.visibled,
    createdAt: label.createdAt,
    updatedAt: label.updatedAt,
  };
}

export function labelsIndexHandler(req, res) {
  Label.findAll({
    where: {
      userId: req.user.id,
    },
    order: [['priority', 'ASC']],
  }).then(labels => {
    res.json(labels.map(label => {
      return omitLabel(label);
    }));
  });
}

export function labelsCreateHandler(req, res) {
  Label.create({
    userId: req.user.id,
    name: req.body.name,
    priority: req.body.priority,
    visibled: true,
  }).then(label => {
    res.json(omitLabel(label));
  });
}

export function labelsUpdateHandler(req, res) {
  Label.findById(req.params.id).then(label => {
    label.update({
      name: (req.body.name !== undefined) ? req.body.name : label.name,
      priority: (req.body.priority !== undefined) ? req.body.priority : label.priority,
      visibled: (req.body.visibled !== undefined) ? req.body.visibled : label.visibled,
    }).then(() => {
      res.json(label);
    });
  });
}

export function labelsDeleteHandler(req, res) {
  Label.findById(req.params.id).then(label => {
    label.destroy().then(destroyedLabel => {
      res.json(destroyedLabel);
    });
  });
}
