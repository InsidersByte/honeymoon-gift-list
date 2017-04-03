// TODO: flow this file

import React, { PropTypes } from 'react';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';

const sourceSpec = {
  beginDrag({ id }) {
    return { id };
  },
};

const SORTABLE_ITEM = 'SortableItem';

const targetSpec = {
  hover(targetProps, monitor) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if (sourceId !== targetId) {
      targetProps.onMove({ sourceId, targetId });
    }
  },
  drop(targetProps, monitor) {
    const { id } = monitor.getItem();
    targetProps.onDrop({ id });
  },
};

@dragSource(SORTABLE_ITEM, sourceSpec, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
@dropTarget(SORTABLE_ITEM, targetSpec, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
export default class SortableItem extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
  };

  render() {
    const { connectDragSource, connectDropTarget, isDragging, children } = this.props;

    return connectDragSource(
      connectDropTarget(
        <div style={{ opacity: isDragging ? 0 : 1 }}>
          {children}
        </div>
      )
    );
  }
}
