import {Label} from '../../../../models';

export function labelsIndexHandler(req, res) {
  Label.findAll({
    where: {
      UserId: req.user.id,
    },
    order: [['priority', 'ASC']],
  }).then(labels => {
    res.json(labels);
  });
}

export function labelsCreateHandler(req, res) {
  Label.create({
    name: req.body.name,
    priority: req.body.priority,
    UserId: req.user.id,
  }).then(label => {
    res.json(label);
  });
}

export function labelsUpdateHandler(req, res) {
  Label.findById(req.body.id).then(label => {
    label.update({
      name: req.body.content,
      priority: req.body.priority,
    }).then(() => {
      res.json(label);
    });
  });
}

export function labelsDeleteHandler(req, res) {
  Label.findById(req.body.id).then(label => {
    label.destroy().then(destroyedLabel => {
      res.json(destroyedLabel);
    });
  });
}
