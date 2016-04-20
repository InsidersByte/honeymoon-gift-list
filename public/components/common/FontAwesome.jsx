import React from 'react';
import classNames from 'classnames';

function FontAwesome(props) {
    const className = classNames(
        props.className,
        {
            fa: true,
            [`fa-${props.icon}`]: true,
            [`fa-${props.size}`]: props.size,
        }
    );

    return (
        <i {...props} className={className}>
            {props.children}
        </i>
    );
}

FontAwesome.propTypes = {
    children: React.PropTypes.element,
    className: React.PropTypes.string,
    icon: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x']),
};

export default FontAwesome;
