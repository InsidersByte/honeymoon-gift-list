import React from 'react';

import './WeddingPartyMember.styl';

export default function WeddingPartyMember(props) {
    return (
        <div className="wedding-party-member">
            <div className="wedding-party-member__image" style={{ backgroundImage: `url(${props.weddingPartyMember.imageUrl})` }}>
            </div>

            <h1 className="wedding-party-member__name">{props.weddingPartyMember.name}</h1>

            <h2 className="wedding-party-member__title">{props.weddingPartyMember.title}</h2>

            <p className="wedding-party-member__description">{props.weddingPartyMember.description}</p>
        </div>
    );
}

WeddingPartyMember.propTypes = {
    weddingPartyMember: React.PropTypes.object.isRequired,
};
