import React, {Component} from 'react';

export class LinkText extends Component {
  render() {
    const pattern = /((?:https?:|ftp:|)\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    const texts  = this.props.text.split(pattern).filter(text => !!text.trim());

    const textElements = texts.map((text, index) => {
      if (text.match(pattern) !== null) {
        return <a key={index} href={text} onClick={event => event.stopPropagation()} target="_blank">{text}</a>;
      } else {
        return text;
      }
    });

    return <span>{textElements}</span>;
  }
}

