import React from 'react';
import WeddingPartyMember from './WeddingPartyMember';

import css from './WeddingPartyMembers.styl';

export default function WeddingPartyMembers(props) {
    return (
        <div className={css.root}>
            {
                props
                    .weddingPartyMembers
                    .map(weddingPartyMember =>
                        <WeddingPartyMember
                            key={weddingPartyMember._id} // eslint-disable-line no-underscore-dangle
                            weddingPartyMember={weddingPartyMember}
                        />
                    )
            }
        </div>
    );
}

WeddingPartyMembers.propTypes = {
    weddingPartyMembers: React.PropTypes.array.isRequired,
};
