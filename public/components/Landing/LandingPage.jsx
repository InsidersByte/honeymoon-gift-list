import React from 'react';
import FontAwesome from '../common/FontAwesome';
import WeddingProfileActions from '../../actions/WeddingProfileActions';
import WeddingProfileStore from '../../stores/WeddingProfileStore';
import basketActions from '../../actions/BasketActions';
import basketStore from '../../stores/BasketStore';
import GiftItems from './GiftItems';
import Basket from './Basket';
import LandingHeader from './LandingHeader';
import LandingSection from './LandingSection';
import MarkdownRenderer from 'react-markdown-renderer';
import moment from 'moment';
import WeddingPartyMembers from './WeddingPartyMembers';
import Loader from '../common/Loader';

import css from './LandingPage.styl';

export default class LandingPage extends React.Component {
    state = { ...basketStore.getState(), ...WeddingProfileStore.getState() };

    componentDidMount() {
        WeddingProfileStore.listen(this.onWeddingProfilesStoreChange);
        basketStore.listen(this.onBasketStoreChange);
        WeddingProfileActions.fetch();
    }

    componentWillUnmount() {
        WeddingProfileStore.unlisten(this.onWeddingProfilesStoreChange);
        basketStore.unlisten(this.onBasketStoreChange);
    }

    onBasketStoreChange = state => {
        this.setState(state);
    };

    onWeddingProfilesStoreChange = state => {
        const newState = Object.assign({}, state);

        if (newState.weddingProfile && newState.weddingProfile.cover && newState.weddingProfile.cover.weddingDate) {
            const weddingDate = moment(newState.weddingProfile.cover.weddingDate);
            const now = moment.now();

            const daysToGo = weddingDate.diff(now, 'days');

            newState.weddingProfile.cover.daysToGo = daysToGo;
        }

        this.setState(newState);
    };

    onScrollDown = event => {
        event.preventDefault();

        const aboutUs = this.refs.aboutUs;
        aboutUs.scrollTo();
    };

    addToBasket(item) {
        basketActions.addToBasket(item);
    }

    renderPaymentMessage = () => {
        if (this.state.weddingProfile.honeymoonGiftList.showPaymentMessage) {
            return (
                <span>
                    <br />
                    <br />

                    <FontAwesome icon="info-circle" /> {this.state.weddingProfile.honeymoonGiftList.paymentMessage}
                </span>
            );
        }

        return null;
    };

    renderDisclaimerMessage = () => {
        if (this.state.weddingProfile.honeymoonGiftList.showDisclaimerMessage) {
            return (
                <span className={css.disclaimerMessage}>
                    <br />
                    <br />

                    <FontAwesome icon="info-circle" /> {this.state.weddingProfile.honeymoonGiftList.disclaimerMessage}
                </span>
            );
        }

        return null;
    };

    renderWeddingPartyMembersSection = () => {
        if (this.state.weddingProfile.weddingPartyMembers.length <= 0) {
            return null;
        }

        const weddingPartyMembersElement = <WeddingPartyMembers weddingPartyMembers={this.state.weddingProfile.weddingPartyMembers} />;

        return <LandingSection title="Wedding Party Members" postContent={weddingPartyMembersElement} />;
    };

    render() {
        const giftItemsElement = ( // eslint-disable-line no-extra-parens
            <GiftItems
                giftItems={this.state.weddingProfile.honeymoonGiftListItems}
                addToBasket={this.addToBasket}
                basketItems={this.state.items}
            />
        );

        return (
            <Loader className={css.root} loading={this.state.loading}>
                <LandingHeader cover={this.state.weddingProfile.cover} onScrollDown={this.onScrollDown} />

                <LandingSection ref="aboutUs" title="A little bit about us">
                    <MarkdownRenderer markdown={this.state.weddingProfile.aboutUs} />
                </LandingSection>

                <LandingSection title="RSVP">
                    <MarkdownRenderer markdown={this.state.weddingProfile.rsvp} />
                </LandingSection>

                <LandingSection title="About our Day">
                    <MarkdownRenderer markdown={this.state.weddingProfile.aboutOurDay} />
                </LandingSection>

                {this.renderWeddingPartyMembersSection()}

                <LandingSection title="Local Flavour">
                    <MarkdownRenderer markdown={this.state.weddingProfile.localFlavour} />
                </LandingSection>

                <LandingSection title="On The Day">
                    <MarkdownRenderer markdown={this.state.weddingProfile.onTheDay} />
                </LandingSection>

                <LandingSection title="the wedding playlist">
                    <MarkdownRenderer markdown={this.state.weddingProfile.weddingPlaylist} />
                </LandingSection>

                <LandingSection title="about our honeymoon">
                    <MarkdownRenderer markdown={this.state.weddingProfile.aboutOurHoneymoon} />
                </LandingSection>

                <LandingSection title="Gift List" postContent={giftItemsElement}>
                    <div>
                        <span className={css.content}>
                            {this.state.weddingProfile.honeymoonGiftList.content}
                        </span>

                        {this.renderPaymentMessage()}

                        {this.renderDisclaimerMessage()}
                    </div>
                </LandingSection>

                <Basket basketCount={this.state.basketCount} total={this.state.total} />
            </Loader>
        );
    }
}
