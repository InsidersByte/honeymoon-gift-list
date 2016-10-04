/* @flow */

import React from 'react';
// FIXME:FLOW need to fix import .styl
import css from './LandingWeddingPartyMember.styl';

type PropsType = {
    weddingPartyMember: {
        name: string,
        title: string,
        imageUrl: string,
        description: string,
    },
};

export default function LandingWeddingPartyMember({ weddingPartyMember: { name, title, imageUrl, description } }: PropsType) {
    const backgroundImageStyle = { backgroundImage: `url(${imageUrl})` };

    return (
        <div className={css.root}>
            <div className={css.image} style={backgroundImageStyle} />

            <h1 className={css.name}>{name}</h1>

            <h2 className={css.title}>{title}</h2>

            <p className={css.description}>{description}</p>
        </div>
    );
}
