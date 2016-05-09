import React from 'react';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@dragDropContext(HTML5Backend)
export default class SortableContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        children: React.PropTypes.element.isRequired,
    };

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
