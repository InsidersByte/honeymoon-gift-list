import React from 'react';
import smoothscroll from 'smoothscroll';
import css from './LandingSection.styl';

export default class LandingSection extends React.Component {
    static propTypes = {
        children: React.PropTypes.element,
        postContent: React.PropTypes.element,
        title: React.PropTypes.string.isRequired,
    };

    scrollTo = () => {
        const container = this.refs.container;
        smoothscroll(container);
    };

    render() {
        return (
            <section ref="container" className={css.root}>
                <h1 className={css.title}>{this.props.title}</h1>

                <div className={css.content}>
                    {this.props.children}
                </div>

                {this.props.postContent}
            </section>
        );
    }
}
