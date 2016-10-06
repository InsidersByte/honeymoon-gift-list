/* @flow */

import React from 'react';
import FontAwesome from './FontAwesome';
import css from './LandingHeader.styl';

type PropsType = {
    weddingProfile: {
        coverTitle: string,
        coverImageUrl: string,
        daysToGo?: number,
    },
    onScrollDown: Function,
};

export default function LandingHeader({ weddingProfile: { coverTitle, coverImageUrl, daysToGo }, onScrollDown }: PropsType) {
    const backgroundImageStyle = { backgroundImage: `url(${coverImageUrl})` };
    let daysTillIDoCountdown = null;

    if (daysToGo) {
        daysTillIDoCountdown = <h2>{daysToGo} Days until I Do</h2>;
    }

    return (
        <header className={css.root} style={backgroundImageStyle}>
            <div className={css.overlay} />
            <div className={css.content}>
                <h1 className={css.title}>{coverTitle}</h1>

                {daysTillIDoCountdown}

                <div className={css.spacer} />

                <a className={css.scrollDown} href="#firstSection" onClick={onScrollDown}>
                    <FontAwesome icon="chevron-down" size="lg" />
                </a>
            </div>
        </header>
    );
}
