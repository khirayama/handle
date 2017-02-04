import actionTypes from 'constants/action-types';
import {getState} from '@khirayama/circuit';

import Label from 'repositories/label';

function find(items, id) {
  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    if (item.id === id) {
      return item;
    }
  }
  return null;
}

export function createLabel(dispatch, name) {
  const state = getState();

  Label.create({
    name,
    priority: state.labels.length,
  }).then(label => {
    dispatch({
      type: actionTypes.CREATE_LABEL,
      label,
    });
  });
}

export function updateLabel(dispatch, labelId, name) {
  const label = {
    id: labelId,
    name,
  };
  dispatch({
    type: actionTypes.UPDATE_LABEL,
    label,
  });
  Label.update(label);
}

export function unvisibledLabel(dispatch, labelId) {
  const label = {
    id: labelId,
    visibled: false,
  };
  dispatch({
    type: actionTypes.UPDATE_LABEL,
    label,
  });
  Label.update(label);
}

export function visibledLabel(dispatch, labelId) {
  const label = {
    id: labelId,
    visibled: true,
  };
  dispatch({
    type: actionTypes.UPDATE_LABEL,
    label,
  });
  Label.update(label);
}

export function deleteLabel(dispatch, labelId) {
  const state = getState();

  const targetLabel = find(state.labels, labelId);
  const newLabels = state.labels.filter(label => {
    return label.id !== labelId;
  }).map(label => {
    if (label.priority > targetLabel.priority) {
      const newLabel = Object.assign({}, label, {priority: label.priority - 1});
      return newLabel;
    }
    return label;
  });

  Label.delete(labelId);

  dispatch({
    type: actionTypes.DELETE_LABEL,
    labels: newLabels,
  });
}

export function sortLabels(dispatch, labelId, to) {
  const state = getState();

  const updatedLabels = [];

  const targetLabel = find(state.labels, labelId);
  const labels = state.labels.sort((labelA, labelB) => {
    return (labelA.priority > labelB.priority) ? 1 : -1;
  });
  const from = targetLabel.priority;

  if (from > to) {
    for (let index = to; index < from; index++) {
      const label_ = labels[index];
      label_.priority += 1;
      updatedLabels.push(label_);
    }
    labels[from].priority = to;
    updatedLabels.push(labels[from]);
  } else if (from < to) {
    for (let index = from + 1; index <= to; index++) {
      const label_ = labels[index];
      label_.priority -= 1;
      updatedLabels.push(label_);
    }
    labels[from].priority = to;
    updatedLabels.push(labels[from]);
  }
  const newLabels = state.labels.map(label => {
    for (let index = 0; index < labels.length; index++) {
      if (labels[index].id === label.id) {
        return labels[index];
      }
    }
    return label;
  });
  Label.bulkUpdate(updatedLabels);
  dispatch({
    type: actionTypes.SORT_LABELS,
    labels: newLabels,
  });
}
