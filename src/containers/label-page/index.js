import React from 'react';
import {Container} from 'libs/container';

import {
  createLabel,
  updateLabel,
} from 'action-creators/label-action-creators';

import {Link} from 'components/link';
import {Icon} from 'components/icon';
import {IconButton} from 'components/icon-button';

export class LabelPage extends Container {
  constructor(props) {
    super(props);

    const label = this.state.labels.filter(label => {
      return (this.state.selectedLabelId === label.id);
    })[0];

    this.state = Object.assign({}, this.state, {
      name: (label) ? label.name : '',
      selectedLabelId: this.state.selectedLabelId || null,
    });
  }
  render() {
    return (
      <section className="page label-page">
        <section className="page-content">
          <header className="label-page-header">
            <IconButton
              className="add-label-button"
              onClick={() => {
                if (this.state.name !== '') {
                  if (this.state.selectedLabelId === null) {
                    createLabel(this.dispatch, this.state.name.trim());
                  } else {
                    updateLabel(this.dispatch, this.state.selectedLabelId, this.state.name.trim());
                  }
                  this.props.changeLocation('/labels');
                }
              }}
              >add</IconButton>
            <Link
              href="/labels"
              className="close-label-button"
              ><Icon>close</Icon></Link>
          </header>
          <section className="label-form">
            <div className="label-form-content-textarea-container">
              <textarea
                autoFocus
                className="label-form-content-textarea"
                placeholder="Name"
                value={this.state.name}
                onFocus={() => {
                  document.querySelector('body').scrollTop = 0;
                }}
                onChange={event => {
                  this.setState({name: event.target.value});
                }}
                onKeyDown={event => {
                  const keyCode = event.keyCode;
                  const shift = event.shiftKey;
                  const ctrl = event.metaKey;

                  const ENTER_KEY = 13;
                  const ESC_KEY = 27;

                  switch (true) {
                    case (keyCode === ENTER_KEY && !shift && !ctrl):
                    case (keyCode === ENTER_KEY && shift && !ctrl):
                    case (keyCode === ENTER_KEY && !shift && ctrl): {
                      if (this.state.selectedLabelId === null) {
                        event.preventDefault();
                        createLabel(this.dispatch, this.state.name.trim());
                      } else {
                        event.preventDefault();
                        updateLabel(this.dispatch, this.state.selectedLabelId, this.state.name.trim());
                      }
                      this.props.changeLocation('/labels');
                      break;
                    }
                    case (keyCode === ESC_KEY && !shift && !ctrl):
                    case (keyCode === ESC_KEY && shift && !ctrl):
                    case (keyCode === ESC_KEY && !shift && ctrl): {
                      this.props.changeLocation('/labels');
                      break;
                    }
                    default: {
                      break;
                    }
                  }
                }}
                />
            </div>
          </section>
        </section>
      </section>
    );
  }
}

LabelPage.propTypes = {};
