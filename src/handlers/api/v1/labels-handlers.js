import {Label} from '../../../../models';

function omitLabel(label) {
  return {
    id: label.id,
    name: label.name,
    priority: label.priority,
    createdAt: label.createdAt,
    updatedAt: label.updatedAt,
  };
}

export function labelsIndexHandler(req, res) {
  Label.findAll({
    where: {
      UserId: req.user.id,
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
  }).then(label => {
    res.json(omitLabel(label));
  });
}

export function labelsUpdateHandler(req, res) {
  Label.findById(req.params.id).then(label => {
    label.update({
      name: req.body.name,
      priority: req.body.priority || label.priority,
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
