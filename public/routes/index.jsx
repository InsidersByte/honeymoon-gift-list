/* @flow */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { LOGIN_ROUTE, ADMIN_ROUTE, SETUP_ROUTE } from '../constants/routeConstants';
import loginStore from '../stores/LoginStore';
import SetupApi from '../api/SetupApi';

import NoMatch from '../components/NoMatch';
import NoMatchAdmin from '../components/NoMatchAdmin';

import App from '../components/App';

import LandingPage from '../components/Landing/LandingPage';
import BasketSummaryPage from '../components/Checkout/BasketSummaryPage';
import GiverDetailsPage from '../components/Checkout/GiverDetailsPage';
import ConfirmationPage from '../components/Checkout/ConfirmationPage';

import LoginPage from '../components/Login/LoginPage';
import ProfilePage from '../components/Profile/ProfilePage';
import SetupPage from '../components/Setup/SetupPage';
import SignUpPage from '../containers/SignUpPage';
import Admin from '../containers/Admin';
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
import UpdateWeddingPartyMemberPage from '../components/WeddingPartyMembers/UpdateWeddingPartyMemberPage';

function requireSetup(nextState, replace, callback) {
    SetupApi
        .get()
        .then(({ status }) => {
            if (!status) {
                replace(SETUP_ROUTE);
            }

            callback();
        })
        .catch((error) => {
            callback(error);
        });
}

function requireAuth(nextState, replace) {
    const { isLoggedIn } = loginStore.getState();

    if (!isLoggedIn) {
        replace(LOGIN_ROUTE);
    }
}

function ifLoggedInRedirectToAdmin(nextState, replace) {
    const { isLoggedIn } = loginStore.getState();

    if (isLoggedIn) {
        replace(ADMIN_ROUTE);
    }
}

export default (
    <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
        <Route path="basket" component={BasketSummaryPage} />
        <Route path="giver" component={GiverDetailsPage} />
        <Route path="confirmation/:giftSetId" component={ConfirmationPage} />
        <Route path="admin" component={Admin}>
            <Route path="setup" component={SetupPage} />

            <Route onEnter={requireSetup}>
                <Route onEnter={ifLoggedInRedirectToAdmin}>
                    <Route path="login" component={LoginPage} />
                    <Route path="reset/:token" component={ResetPage} />
                    <Route path="signUp/:token" component={SignUpPage} />
                </Route>

                <Route onEnter={requireAuth}>
                    <IndexRoute component={AuthenticatedLanding} onEnter={requireAuth} />
                    <Route path="profile" component={ProfilePage} />
                    <Route path="cover" component={CoverPage} />
                    <Route path="aboutUs" component={AboutUsPage} />
                    <Route path="rsvp" component={RsvpPage} />
                    <Route path="aboutOurDay" component={AboutOurDayPage} />
                    <Route path="localFlavour" component={LocalFlavourPage} />
                    <Route path="onTheDay" component={OnTheDayPage} />
                    <Route path="weddingPlaylist" component={WeddingPlaylistPage} />
                    <Route path="aboutOurHoneymoon" component={AboutOurHoneymoonPage} />
                    <Route path="honeymoonGiftList" component={HoneymoonGiftListPage} />
                    <Route path="honeymoonGiftListItem" component={HoneymoonGiftListItemPage} />
                    <Route path="users" component={UsersPage} />
                    <Route path="giftSet" component={GiftSetsPage} />
                    <Route path="giftSet/:giftSetId" component={GiftSetPage} />
                    <Route path="weddingPartyMember" component={WeddingPartyMembersPage} />
                    <Route path="weddingPartyMember/create" component={CreateWeddingPartyMemberPage} />
                    <Route path="weddingPartyMember/:id" component={UpdateWeddingPartyMemberPage} />

                    <Route path="*" component={NoMatchAdmin} />
                </Route>
            </Route>
        </Route>
        <Route path="*" component={NoMatch} />
    </Route>
);
