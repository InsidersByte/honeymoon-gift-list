import React from 'react';

import css from './LandingSection.styl';

export default function LandingSection(props) {
    return (
        <section className={css.root}>
            <h1 className={css.title}>{props.title}</h1>

            <div className={css.content}>
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
