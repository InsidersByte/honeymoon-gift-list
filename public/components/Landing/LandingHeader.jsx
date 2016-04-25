import React from 'react';
import FontAwesome from '../common/FontAwesome';

import './LandingHeader.styl';

export default function LandingHeader(props) {
    const backgroundImageStyle = { backgroundImage: `url(${props.cover.imageUrl})` };
    let daysTillIDoCountdown = null;

    if (props.cover.weddingDate) {
        daysTillIDoCountdown = (
            <h2>
                {props.cover.daysToGo} Days until I Do
            </h2>
        );
    }

    return (
        <header className="landing-header" style={backgroundImageStyle}>
            <div className="landing-header__overlay"></div>
            <div className="landing-header__content">
                <h1 className="landing-header__title">{props.cover.title}</h1>

                {daysTillIDoCountdown}

                <div style={{ flex: '1 1 5%', maxHeight: '5%' }}></div>

                <FontAwesome className="landing-header__scroll-down" icon="chevron-down" size="lg" />
            </div>
        </header>
    );
}

LandingHeader.propTypes = {
    cover: React.PropTypes.object.isRequired,
};

LandingHeader.defaultProps = {
    cover: {},
};
