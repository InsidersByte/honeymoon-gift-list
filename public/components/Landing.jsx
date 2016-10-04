/* @flow */

import React, { Component } from 'react';
import Loader from '../components/Loader';
import LandingHeader from './LandingHeader';
import LandingSection from './LandingSection';
import LandingWeddingPartyMembers from './LandingWeddingPartyMembers';
// FIXME:FLOW need to fix import .styl
import css from './Landing.styl';

type PropsType = {
    loading: boolean,
    onScrollDown: Function,
    weddingProfile: {
        id: number,
        coverTitle: string,
        coverImageUrl: string,
        weddingDate: Date,
        giftListContent: string,
        showPaymentMessage: boolean,
        paymentMessage: string,
        showDisclaimerMessage: boolean,
        disclaimerMessage: string,
        daysToGo?: number,
    },
    sections: Array<{
        id: number,
        title: string,
        content: string,
    }>,
    weddingPartyMembers: Array<{
        id: number,
        name: string,
        title: string,
        imageUrl: string,
        description: string,
    }>,
};

export default class Landing extends Component {
    props: PropsType;

    firstSection: LandingSection;

    scrollToFirstSection = () => {
        this.firstSection.scrollTo();
    };

    render() {
        const { loading, onScrollDown, weddingProfile, sections, weddingPartyMembers } = this.props;

        return (
            <Loader loading={loading} className={css.root}>
                <LandingHeader
                    weddingProfile={weddingProfile}
                    onScrollDown={onScrollDown}
                />

                {
                    sections.map(({ id, title, content }, i) => {
                        if (i === 0) {
                            return (
                                <LandingSection
                                    ref={(c) => { this.firstSection = c; }}
                                    key={id}
                                    title={title}
                                    content={content}
                                />
                            );
                        }

                        return (
                            <LandingSection
                                key={id}
                                title={title}
                                content={content}
                            />
                        );
                    })
                }

                <LandingWeddingPartyMembers
                    weddingPartyMembers={weddingPartyMembers}
                />
            </Loader>
        );
    }
}
