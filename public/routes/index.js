import React from 'react';
import { Route, IndexRoute } from 'react-router';

import loginStore from '../stores/LoginStore';

import NoMatch from '../components/NoMatch';
import NoMatchAdmin from '../components/NoMatchAdmin';

import App from '../components/App';

import LandingPage from '../components/Landing/LandingPage';
import BasketSummaryPage from '../components/Checkout/BasketSummaryPage';
import GiverDetailsPage from '../components/Checkout/GiverDetailsPage';
import ConfirmationPage from '../components/Checkout/ConfirmationPage';

import LoginPage from '../components/Login/LoginPage';
import SetupPage from '../components/Setup/SetupPage';
import Admin from '../components/Admin';
import AuthenticatedLanding from '../components/AuthenticatedLanding';
import CoverPage from '../components/Cover/CoverPage';
import AboutUsPage from '../components/AboutUs/AboutUsPage';
import RsvpPage from '../components/Rsvp/RsvpPage';
import AboutOurDayPage from '../components/AboutOurDay/AboutOurDayPage';
import LocalFlavourPage from '../components/LocalFlavour/LocalFlavourPage';
import OnTheDayPage from '../components/OnTheDay/OnTheDayPage';
import WeddingPlaylistPage from '../components/WeddingPlaylist/WeddingPlaylistPage';
import AboutOurHoneymoonPage from '../components/AboutOurHoneymoon/AboutOurHoneymoonPage';
import HoneymoonGiftListItemPage from '../components/HoneymoonGiftListItem/HoneymoonGiftListItemPage';
import HoneymoonGiftListPage from '../components/HoneymoonGiftList/HoneymoonGiftListPage';
import UsersPage from '../components/Users/UsersPage';
import GiftSetsPage from '../components/GiftSet/GiftSetsPage';
import GiftSetPage from '../components/GiftSet/GiftSetPage';
import ResetPage from '../components/Reset/ResetPage';
import WeddingPartyMembersPage from '../components/WeddingPartyMembers/WeddingPartyMembersPage';
import CreateWeddingPartyMemberPage from '../components/WeddingPartyMembers/CreateWeddingPartyMemberPage';

function requireAuth(nextState, replace) {
    const { isLoggedIn } = loginStore.getState();

    if (!isLoggedIn) {
        replace('admin/login');
    }
}

export default (
    <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
        <Route path="basket" component={BasketSummaryPage} />
        <Route path="giver" component={GiverDetailsPage} />
        <Route path="confirmation/:giftSetId" component={ConfirmationPage} />
        <Route path="admin" component={Admin}>
            <IndexRoute component={AuthenticatedLanding} onEnter={requireAuth} />
            <Route path="login" component={LoginPage} />
            <Route path="setup" component={SetupPage} />
            <Route path="reset/:token" component={ResetPage} />
            <Route path="cover" component={CoverPage} onEnter={requireAuth} />
            <Route path="aboutUs" component={AboutUsPage} onEnter={requireAuth} />
            <Route path="rsvp" component={RsvpPage} onEnter={requireAuth} />
            <Route path="aboutOurDay" component={AboutOurDayPage} onEnter={requireAuth} />
            <Route path="localFlavour" component={LocalFlavourPage} onEnter={requireAuth} />
            <Route path="onTheDay" component={OnTheDayPage} onEnter={requireAuth} />
            <Route path="weddingPlaylist" component={WeddingPlaylistPage} onEnter={requireAuth} />
            <Route path="aboutOurHoneymoon" component={AboutOurHoneymoonPage} onEnter={requireAuth} />
            <Route path="honeymoonGiftList" component={HoneymoonGiftListPage} onEnter={requireAuth} />
            <Route path="honeymoonGiftListItem" component={HoneymoonGiftListItemPage} onEnter={requireAuth} />
            <Route path="users" component={UsersPage} onEnter={requireAuth} />
            <Route path="giftSet" component={GiftSetsPage} onEnter={requireAuth} />
            <Route path="giftSet/:giftSetId" component={GiftSetPage} onEnter={requireAuth} />
            <Route path="weddingPartyMember" component={WeddingPartyMembersPage} onEnter={requireAuth} />
            <Route path="weddingPartyMember/create" component={CreateWeddingPartyMemberPage} onEnter={requireAuth} />
            <Route path="*" component={NoMatchAdmin} />
        </Route>
        <Route path="*" component={NoMatch} />
    </Route>
);
