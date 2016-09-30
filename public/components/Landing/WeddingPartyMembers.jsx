import React from 'react';
import WeddingPartyMember from './WeddingPartyMember';

import css from './WeddingPartyMembers.styl';

export default function WeddingPartyMembers({ weddingPartyMembers }) {
    return (
        <div className={css.root}>
            {
                weddingPartyMembers
                    .map(weddingPartyMember =>
                        <WeddingPartyMember
                            key={weddingPartyMember.id}
                            weddingPartyMember={weddingPartyMember}
                        />
                    )
            }
        </div>
    );
}

WeddingPartyMembers.propTypes = {
    weddingPartyMembers: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
};
