import React from 'react';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

function SortableContainer(props) {
    return (
        <div>
            {props.children}
        </div>
    );
}

SortableContainer.propTypes = {
    children: React.PropTypes.element.isRequired,
};

export default dragDropContext(HTML5Backend)(SortableContainer);
