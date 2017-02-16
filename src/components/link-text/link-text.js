import React, {Component, PropTypes} from 'react';

export class LinkText extends Component {
  constructor() {
    super();

    this.handleClick = this._handleClick.bind(this);
  }
  _handleClick(event) {
    event.stopPropagation();
  }
  render() {
    const pattern = /((?:https?:|ftp:|)\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
    const texts = this.props.text.split(pattern).filter(text => Boolean(text.trim()));

    const textElements = texts.map((text, index) => {
      if (text.match(pattern) !== null) {
        return <a key={index} href={text} onClick={this.handleClick} target="_blank" rel="noopener noreferrer">{text}</a>;
      }
      return text;
    });

    return <span>{textElements}</span>;
  }
}

LinkText.propTypes = {
  text: PropTypes.string.isRequired,
};
