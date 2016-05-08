import React from 'react';
import FontAwesome from '../common/FontAwesome';
import css from './LandingHeader.styl';

export default function LandingHeader(props) {
    const backgroundImageStyle = { backgroundImage: `url(${props.cover.imageUrl})` };
    let daysTillIDoCountdown = null;

    if (props.cover.weddingDate) {
        daysTillIDoCountdown = <h2>{props.cover.daysToGo} Days until I Do</h2>;
    }

    return (
        <header className={css.root} style={backgroundImageStyle}>
            <div className={css.overlay}></div>
            <div className={css.content}>
                <h1 className={css.title}>{props.cover.title}</h1>

                {daysTillIDoCountdown}

                <div className={css.spacer}></div>

                <a className={css.scrollDown} href="#" onClick={props.onScrollDown}>
                    <FontAwesome icon="chevron-down" size="lg" />
                </a>
            </div>
        </header>
    );
}

LandingHeader.propTypes = {
    cover: React.PropTypes.object.isRequired,
    onScrollDown: React.PropTypes.func.isRequired,
};

LandingHeader.defaultProps = {
    cover: {},
};
