import React from 'react';
import {Container} from 'libs/container';

import {PAGE_TRANSITION_TIME} from 'components/constants';

import {
  createLabel,
  updateLabel,
} from 'action-creators/label-action-creators';

import {Link} from 'components/link';
import {
  Icon,
  IconButton,
} from '@khirayama/handle-ui';

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
  componentDidMount() {
    super.componentDidMount();
    setTimeout(() => {
      this.inputElement.focus();
    }, PAGE_TRANSITION_TIME + 3);
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
            <div
              className="label-form-content-input-container"
              onClick={() => {
                this.inputElement.focus();
              }}
              >
              <input
                type="text"
                className="label-form-content-input"
                placeholder="Label Name"
                value={this.state.name}
                ref={inputElement => this.inputElement = inputElement}
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
                      event.preventDefault();
                      if (this.state.selectedLabelId === null) {
                        createLabel(this.dispatch, this.state.name.trim());
                      } else {
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
