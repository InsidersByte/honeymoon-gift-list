/* @flow */

import React from 'react';
import css from './index.styl';

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

      <h3 className={css.title}>"{title}"</h3>

      <p className={css.description}>{description}</p>
    </div>
  );
}
