/* @flow */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import * as weddingProfileActions from '../actions/weddingProfile';
import * as sectionActions from '../redux/sections';
import * as weddingPartyMembersActions from '../actions/weddingPartyMember';
import * as giftActions from '../actions/gift';
import * as basketActions from '../redux/basket';
import Landing from '../components/Landing';

type PropsType = {
  loading: boolean,
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
    inStock: number,
  }>,
  basket: Map<number, Object>,
  basketCount: number,
  basketTotal: number,
  actions: {
    loadWeddingProfile: Function,
    loadSections: Function,
    loadWeddingPartyMembers: Function,
    loadGifts: Function,
    addToBasket: Function,
  },
};

@connect(
  ({ weddingProfile: weddingProfileState, sections: sectionsState, weddingPartyMembers, gifts: giftsState, basket }) => {
    const loading = weddingProfileState.loading || sectionsState.loading || weddingPartyMembers.loading || giftsState.loading;

    let { weddingProfile } = weddingProfileState;

    if (!loading && weddingProfile.weddingDate) {
      const weddingDate = moment(weddingProfile.weddingDate);
      const now = moment().startOf('day');

      const daysToGo = weddingDate.diff(now, 'days');

      weddingProfile = Object.assign({}, weddingProfile, { daysToGo });
    }

    let basketCount = 0;
    let basketTotal = 0;

    for (const item of basket.values()) {
      const { quantity, price } = item;
      basketCount += quantity;
      basketTotal += price * quantity;
    }

    const { sections } = sectionsState;
    const visibleSections = sections.filter(o => !o.hidden);
    const sortedSections = visibleSections.sort((a, b) => a.position - b.position);

    const { gifts } = giftsState;
    const giftsWithRemaining = gifts.map(gift => {
      const { id, remaining } = gift;
      const { quantity } = basket.get(id) || { quantity: 0 };
      return Object.assign({}, gift, { inStock: remaining - quantity });
    });
    const sortedGifts = giftsWithRemaining.sort((a, b) => a.position - b.position);

    return {
      weddingProfile,
      loading,
      basket,
      basketCount,
      basketTotal,
      sections: sortedSections,
      weddingPartyMembers: weddingPartyMembers.weddingPartyMembers,
      gifts: sortedGifts,
    };
  },
  dispatch => ({
    actions: {
      ...bindActionCreators(weddingProfileActions, dispatch),
      ...bindActionCreators(sectionActions, dispatch),
      ...bindActionCreators(weddingPartyMembersActions, dispatch),
      ...bindActionCreators(giftActions, dispatch),
      ...bindActionCreators(basketActions, dispatch),
    },
  })
)
export default class LandingPage extends React.Component {
  props: PropsType;

  componentDidMount() {
    const { actions: { loadWeddingProfile, loadSections, loadWeddingPartyMembers, loadGifts } } = this.props;

    loadWeddingProfile();
    loadSections();
    loadWeddingPartyMembers();
    loadGifts();
  }

  landing: Landing;

  onScrollDown = (event: SyntheticEvent) => {
    event.preventDefault();
    this.landing.scrollToFirstSection();
  };

  addToBasket = (gift: Object) => {
    this.props.actions.addToBasket(gift);
  };

  render() {
    const { loading, weddingProfile, sections, weddingPartyMembers, gifts, basket, basketCount, basketTotal } = this.props;

    return (
      <Landing
        ref={c => {
          this.landing = c;
        }}
        loading={loading}
        weddingProfile={weddingProfile}
        sections={sections}
        weddingPartyMembers={weddingPartyMembers}
        gifts={gifts}
        basket={basket}
        basketCount={basketCount}
        basketTotal={basketTotal}
        addToBasket={this.addToBasket}
        onScrollDown={this.onScrollDown}
      />
    );
  }
}
