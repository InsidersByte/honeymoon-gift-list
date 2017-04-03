/* @flow */

import React from 'react';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

type PropsType = {
  children?: React$Element<any>,
};

@dragDropContext(HTML5Backend)
export default // eslint-disable-next-line react/prefer-stateless-function
class SortableContainer extends React.Component {
  props: PropsType;

  render() {
    return <div>{this.props.children}</div>;
  }
}
