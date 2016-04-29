import React from 'react';

import css from './WeddingPartyMember.styl';

export default function WeddingPartyMember(props) {
    return (
        <div className={css.root}>
            <div className={css.image} style={{ backgroundImage: `url(${props.weddingPartyMember.imageUrl})` }}>
            </div>

            <h1 className={css.name}>{props.weddingPartyMember.name}</h1>

            <h2 className={css.title}>{props.weddingPartyMember.title}</h2>

            <p className={css.description}>{props.weddingPartyMember.description}</p>
        </div>
    );
}

WeddingPartyMember.propTypes = {
    weddingPartyMember: React.PropTypes.object.isRequired,
};
