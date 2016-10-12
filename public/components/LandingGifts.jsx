/* @flow */

import React from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import Info from 'material-ui/svg-icons/action/info';
import LandingGift from './LandingGift';
import LandingItem from './LandingItem';
import css from './LandingGifts.styl';

type PropsType = {
    weddingProfile: {
        giftListContent: string,
        showPaymentMessage: boolean,
        paymentMessage: string,
        showDisclaimerMessage: boolean,
        disclaimerMessage: string,
    },
    gifts: Array<{
        id: number,
        name: string,
        imageUrl: string,
        price: number,
        remaining: number,
    }>,
    basket: Map<number, Object>,
    addToBasket: Function,
};

const styles = {
    icon: {
        height: 18,
        width: 18,
    },
};

export default function LandingGifts({ weddingProfile, gifts, basket, addToBasket }: PropsType) {
    const { giftListContent, showPaymentMessage, paymentMessage, showDisclaimerMessage, disclaimerMessage } = weddingProfile;

    const giftsElement = (
        <div className={css.root}>
            {
                gifts.map(gift =>
                    <LandingGift
                        key={gift.id}
                        gift={gift}
                        basket={basket}
                        addToBasket={addToBasket}
                    />
                )
            }
        </div>
    );

    return (
        <LandingItem title="Gift List" postContent={giftsElement}>
            <div>
                <MarkdownRenderer markdown={giftListContent} />

                {showPaymentMessage && (
                    <span>
                        <br />
                        <br />

                        <Info color={'#9a9ca7'} style={styles.icon} /> {paymentMessage}
                    </span>
                )}

                {showDisclaimerMessage && (
                    <span className={css.disclaimerMessage}>
                        <br />
                        <br />

                        <Info color={'#9a9ca7'} style={styles.icon} /> {disclaimerMessage}
                    </span>
                )}
            </div>
        </LandingItem>
    );
}
