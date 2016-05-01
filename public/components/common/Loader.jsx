import React from 'react';
import ReactLoader from 'react-loader';

export default function Loader(props) {
    return (
        <ReactLoader {...props} loadedClassName={props.className} loaded={!props.loading}>
            {props.children}
        </ReactLoader>
    );
}

Loader.propTypes = {
    loading: React.PropTypes.bool.isRequired,
    children: React.PropTypes.element.isRequired,
    className: React.PropTypes.string,
};
