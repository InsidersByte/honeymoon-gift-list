import React from 'react';

import './LandingSection.styl';

export default function LandingSection(props) {
    return (
        <section className="landing-section">
            <h1 className="landing-section__title">{props.title} <span></span></h1>

            <div className="landing-section__content">
                {props.children}
            </div>

            {props.postContent}
        </section>
    );
}

LandingSection.propTypes = {
    children: React.PropTypes.element,
    postContent: React.PropTypes.element,
    title: React.PropTypes.string.isRequired,
};
