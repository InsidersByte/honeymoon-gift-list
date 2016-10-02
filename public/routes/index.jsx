import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { LOGIN_ROUTE, ADMIN_ROUTE, SETUP_ROUTE } from '../constants/routes';
import api from '../api';
import { HTTP_METHODS } from '../constants/api';

import NoMatch from '../components/NoMatch';
import NoMatchAdmin from '../components/NoMatchAdmin';

import Root from '../containers/Root';

import LandingPage from '../components/Landing/LandingPage';
import BasketSummaryPage from '../components/Checkout/BasketSummaryPage';
import GiverDetailsPage from '../components/Checkout/GiverDetailsPage';
import ConfirmationPage from '../components/Checkout/ConfirmationPage';

import LoginPage from '../containers/LoginPage';
import ProfilePage from '../containers/ProfilePage';
import SetupPage from '../containers/SetupPage';
import SignUpPage from '../containers/SignUpPage';
import Admin from '../containers/Admin';
import WeddingProfilePage from '../containers/WeddingProfilePage';
import HoneymoonGiftListItemPage from '../components/HoneymoonGiftListItem/HoneymoonGiftListItemPage';
import UsersPage from '../containers/UsersPage';
import GiftSetsPage from '../components/GiftSet/GiftSetsPage';
import GiftSetPage from '../components/GiftSet/GiftSetPage';
import ResetPasswordPage from '../containers/ResetPasswordPage';
import WeddingPartyMembersPage from '../components/WeddingPartyMembers/WeddingPartyMembersPage';
import CreateWeddingPartyMemberPage from '../components/WeddingPartyMembers/CreateWeddingPartyMemberPage';
import UpdateWeddingPartyMemberPage from '../components/WeddingPartyMembers/UpdateWeddingPartyMemberPage';
import SectionsPage from '../containers/SectionsPage';

function checkSetup(callback, onSuccess) {
    api({ method: HTTP_METHODS.GET, endpoint: 'setup' })
        .then(({ status }) => {
            onSuccess({ status });
            callback();
        })
        .catch((error) => {
            callback(error);
        });
}

function requireNoSetup(nextState, replace, callback) {
    checkSetup(callback, ({ status }) => {
        if (status) {
            replace(ADMIN_ROUTE);
        }
    });
}

function requireSetup(nextState, replace, callback) {
    checkSetup(callback, ({ status }) => {
        if (!status) {
            replace(SETUP_ROUTE);
        }
    });
}

function requireAuth(store) {
    return (nextState, replace) => {
        const { auth: { isAuthenticated } } = store.getState();

        if (!isAuthenticated) {
            replace(LOGIN_ROUTE);
        }
    };
}

function ifLoggedInRedirectToAdmin(store) {
    return (nextState, replace) => {
        const { auth: { isAuthenticated } } = store.getState();

        if (isAuthenticated) {
            replace(ADMIN_ROUTE);
        }
    };
}

export default store => (
    <Route path="/" component={Root}>
        <IndexRoute component={LandingPage} />
        <Route path="basket" component={BasketSummaryPage} />
        <Route path="giver" component={GiverDetailsPage} />
        <Route path="confirmation/:giftSetId" component={ConfirmationPage} />
        <Route path="admin" component={Admin}>
            <IndexRedirect to="giftSet" />
            <Route path="setup" component={SetupPage} onEnter={requireNoSetup} />

            <Route onEnter={requireSetup}>
                <Route onEnter={ifLoggedInRedirectToAdmin(store)}>
                    <Route path="login" component={LoginPage} />
                    <Route path="reset/:token" component={ResetPasswordPage} />
                    <Route path="signUp/:token" component={SignUpPage} />
                </Route>

                <Route onEnter={requireAuth(store)}>
                    <Route path="profile" component={ProfilePage} />
                    <Route path="weddingProfile" component={WeddingProfilePage} />
                    <Route path="honeymoonGiftListItem" component={HoneymoonGiftListItemPage} />
                    <Route path="section" component={SectionsPage} />
                    <Route path="user" component={UsersPage} />
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
