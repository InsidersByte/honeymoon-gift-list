import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { LOGIN_ROUTE, ADMIN_ROUTE, SETUP_ROUTE } from '../constants/routes';
import api from '../api';
import { HTTP_METHODS } from '../constants/api';

import App from '../containers/App';

import NoMatch from '../components/NoMatch';
import NoMatchAdmin from '../components/NoMatchAdmin';

import Main from '../containers/Main';
import LandingPage from '../containers/LandingPage';
import BasketSummaryPage from '../containers/BasketSummaryPage';
import GiverDetailsPage from '../containers/GiverDetailsPage';
import ConfirmationPage from '../containers/ConfirmationPage';

import Admin from '../containers/Admin';
import LoginPage from '../containers/LoginPage';
import ProfilePage from '../containers/ProfilePage';
import SetupPage from '../containers/SetupPage';
import SignUpPage from '../containers/SignUpPage';
import AdminLoggedIn from '../containers/AdminLoggedIn';
import AdminNotLoggedIn from '../containers/AdminNotLoggedIn';
import WeddingProfilePage from '../containers/WeddingProfilePage';
import GiftsPage from '../containers/GiftsPage';
import UsersPage from '../containers/UsersPage';
import GiftSetsPage from '../containers/GiftSetsPage';
import GiftSetPage from '../containers/GiftSetPage';
import ResetPasswordPage from '../containers/ResetPasswordPage';
import WeddingPartyMembersPage from '../containers/WeddingPartyMembersPage';
import CreateWeddingPartyMemberPage from '../containers/CreateWeddingPartyMemberPage';
import UpdateWeddingPartyMemberPage from '../containers/UpdateWeddingPartyMemberPage';
import SectionsPage from '../containers/SectionsPage';
import CreateSectionPage from '../containers/CreateSectionPage';
import UpdateSectionPage from '../containers/UpdateSectionPage';

function checkSetup(callback, onSuccess) {
  api({ method: HTTP_METHODS.GET, endpoint: 'setup' })
    .then(({ status }) => {
      onSuccess({ status });
      callback();
    })
    .catch(error => {
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
  <Route path="/" component={App}>
    <Route component={Main}>
      <IndexRoute component={LandingPage} />
      <Route path="basket" component={BasketSummaryPage} />
      <Route path="giver" component={GiverDetailsPage} />
      <Route path="confirmation/:giftSetId" component={ConfirmationPage} />
    </Route>

    <Route path="admin" component={Admin}>
      <IndexRedirect to="giftSet" />

      <Route onEnter={ifLoggedInRedirectToAdmin(store)} component={AdminNotLoggedIn}>
        <Route path="setup" component={SetupPage} onEnter={requireNoSetup} />

        <Route onEnter={requireSetup}>
          <Route path="login" component={LoginPage} />
          <Route path="reset/:token" component={ResetPasswordPage} />
          <Route path="signUp/:token" component={SignUpPage} />
        </Route>
      </Route>

      <Route onEnter={requireSetup}>
        <Route onEnter={requireAuth(store)} component={AdminLoggedIn}>
          <Route path="profile" component={ProfilePage} />
          <Route path="weddingProfile" component={WeddingProfilePage} />
          <Route path="gift" component={GiftsPage} />
          <Route path="section" component={SectionsPage} />
          <Route path="section/create" component={CreateSectionPage} />
          <Route path="section/:id" component={UpdateSectionPage} />
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
