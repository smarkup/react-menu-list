/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';

const stopPropagation = (e: MouseEvent) => {
  e.stopPropagation();
};

class Portal extends React.Component {
  _defaultNode: HTMLElement;

  // react portals are buggy: https://github.com/facebook/react/issues/11387
  _events = {
    onMouseDown: stopPropagation,
    onMouseUp: stopPropagation,
    onClick: stopPropagation,
    onDoubleClick: stopPropagation,
    onContextMenu: stopPropagation,
  };

  _setupDefaultNode() {
    this._defaultNode = document.createElement('div');
    document.body.appendChild(this._defaultNode);
  }

  componentWillUnmount() {
    if (this._defaultNode) {
      document.body.removeChild(this._defaultNode);
    }
    this._defaultNode = undefined;
  }

  render() {
    if (!this._defaultNode) {
      this._setupDefaultNode();
    }

    return ReactDOM.createPortal(
      <div {...this._events}>{this.props.children}</div>,
      this._defaultNode
    );
  }
}

export default Portal;
