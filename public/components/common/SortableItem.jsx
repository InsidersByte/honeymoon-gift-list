import React from 'react';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import { SORTABLE_ITEM } from '../../constants/itemTypes';
import css from './SortableItem.styl';

const sourceSpec = {
    beginDrag({ id }) {
        return { id };
    },
};

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
@dropTarget(SORTABLE_ITEM, targetSpec, (connect) => ({
    connectDropTarget: connect.dropTarget(),
}))
export default class SortableItem extends React.Component {
    static propTypes = {
        connectDragSource: React.PropTypes.func.isRequired,
        connectDropTarget: React.PropTypes.func.isRequired,
        isDragging: React.PropTypes.bool.isRequired,
        id: React.PropTypes.string.isRequired,
        onMove: React.PropTypes.func.isRequired,
        onDrop: React.PropTypes.func.isRequired,
        children: React.PropTypes.element.isRequired,
    };

    render() {
        const { connectDragSource, connectDropTarget, isDragging } = this.props;
        const rootClassName = isDragging ? css.hidden : '';

        return connectDragSource(connectDropTarget(
            <div className={rootClassName}>
                {this.props.children}
            </div>
        ));
    }
}
