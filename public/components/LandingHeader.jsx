/* @flow */

import React from 'react';
import { IconButton } from 'material-ui';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import { white } from 'material-ui/styles/colors';
import css from './LandingHeader.styl';

type PropsType = {
    weddingProfile: {
        coverTitle: string,
        coverImageUrl: string,
        daysToGo?: number,
    },
    onScrollDown: Function,
};

const styles = {
    button: {
        margin: 0,
        width: 72,
        height: 72,
    },
    icon: {
        width: 36,
        height: 36,
    },
};

export default function LandingHeader({ weddingProfile: { coverTitle, coverImageUrl, daysToGo }, onScrollDown }: PropsType) {
    const backgroundImageStyle = { backgroundImage: `url(${coverImageUrl})` };
    let daysTillIDoCountdown = null;

    if (daysToGo) {
        daysTillIDoCountdown = <h2 className={css.daysToGo}>{daysToGo} Days until I Do</h2>;
    }

    return (
        <header className={css.root} style={backgroundImageStyle}>
            <div className={css.overlay} />
            <div className={css.content}>
                <h1 className={css.title}>{coverTitle}</h1>

                {daysTillIDoCountdown}

                <div className={css.spacer} />

                <div className={css.scrollDown}>
                    <IconButton onClick={onScrollDown} iconStyle={styles.icon} style={styles.button}>
                        <ArrowDown color={white} />
                    </IconButton>
                </div>
            </div>
        </header>
    );
}
