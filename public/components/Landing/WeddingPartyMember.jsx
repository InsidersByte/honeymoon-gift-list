import React from 'react';

import css from './WeddingPartyMember.styl';

export default function WeddingPartyMember(props) {
    const backgroundImageStyle = { backgroundImage: `url(${props.weddingPartyMember.imageUrl})` };

    return (
        <div className={css.root}>
            <div className={css.image} style={backgroundImageStyle}>
            </div>

            <h1 className={css.name}>{props.weddingPartyMember.name}</h1>

            <h2 className={css.title}>{props.weddingPartyMember.title}</h2>

            <p className={css.description}>{props.weddingPartyMember.description}</p>
        </div>
    );
}

WeddingPartyMember.propTypes = {
    weddingPartyMember: React.PropTypes.shape({
        imageUrl: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
    }).isRequired,
};
