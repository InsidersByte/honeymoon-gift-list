/* @flow */

import React, { Component } from 'react';
import Loader from '../components/Loader';
import LandingHeader from './LandingHeader';
import LandingSection from './LandingSection';
import LandingWeddingPartyMembers from './LandingWeddingPartyMembers';
import LandingGifts from './LandingGifts';
import LandingBasket from './LandingBasket';
import css from './Landing.styl';

type PropsType = {
    loading: boolean,
    onScrollDown: Function,
    addToBasket: Function,
    basket: Map<number, Object>,
    basketCount: number,
    basketTotal: number,
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
    gifts: Array<{
        id: number,
        name: string,
        imageUrl: string,
        price: number,
        remaining: number,
    }>,
};

export default class Landing extends Component {
    props: PropsType;

    firstSection: LandingSection;

    scrollToFirstSection = () => {
        this.firstSection.scrollTo();
    };

    render() {
        const { loading, onScrollDown, addToBasket, weddingProfile, sections, weddingPartyMembers, gifts, basket, basketCount, basketTotal } = this.props;

        return (
            <Loader loading={loading} className={css.root}>
                <LandingHeader weddingProfile={weddingProfile} onScrollDown={onScrollDown} />

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

                <LandingWeddingPartyMembers weddingPartyMembers={weddingPartyMembers} />
                <LandingGifts weddingProfile={weddingProfile} gifts={gifts} addToBasket={addToBasket} basket={basket} />
                <LandingBasket count={basketCount} total={basketTotal} />
            </Loader>
        );
    }
}
