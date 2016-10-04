/* @flow */

import React from 'react';
import LandingWeddingPartyMember from './LandingWeddingPartyMember';
import LandingItem from './LandingItem';
// FIXME:FLOW need to fix import .styl
import css from './LandingWeddingPartyMembers.styl';

type PropsType = {
    weddingPartyMembers: Array<{
        id: number,
        name: string,
        title: string,
        imageUrl: string,
        description: string,
    }>,
};

export default function LandingWeddingPartyMembers({ weddingPartyMembers }: PropsType) {
    if (weddingPartyMembers.length === 0) {
        return null;
    }

    return (
        <LandingItem title="Wedding Party Members">
            <div className={css.root}>
                {
                    weddingPartyMembers
                        .map(({ id, ...weddingPartyMember }) =>
                            <LandingWeddingPartyMember
                                key={id}
                                weddingPartyMember={weddingPartyMember}
                            />
                        )
                }
            </div>
        </LandingItem>
    );
}
