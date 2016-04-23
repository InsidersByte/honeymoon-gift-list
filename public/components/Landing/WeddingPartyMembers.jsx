import React from 'react';
import WeddingPartyMember from './WeddingPartyMember';

export default function WeddingPartyMembers(props) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '15px', justifyContent: 'center' }}>
            {
                props
                    .weddingPartyMembers
                    .map(weddingPartyMember => (
                        <WeddingPartyMember
                            key={weddingPartyMember._id} // eslint-disable-line no-underscore-dangle
                            weddingPartyMember={weddingPartyMember}
                        />
                    ))
            }
        </div>
    );
}

WeddingPartyMembers.propTypes = {
    weddingPartyMembers: React.PropTypes.array.isRequired,
};
