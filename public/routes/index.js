import React from 'react'; //eslint-disable-line
import { Route, IndexRoute } from 'react-router';

import loginStore from '../stores/login.store.js';

import NoMatch from '../components/NoMatch.jsx';
import NoMatchAdmin from '../components/NoMatchAdmin.jsx';

import App from '../components/App.jsx';

import LandingPage from '../components/Landing/LandingPage.jsx';
import BasketSummaryPage from '../components/Checkout/BasketSummaryPage.jsx';
import GiverDetailsPage from '../components/Checkout/GiverDetailsPage.jsx';

import LoginPage from '../components/Login/LoginPage.jsx';
import SetupPage from '../components/Setup/SetupPage.jsx';
import Admin from '../components/Admin.jsx';
import AuthenticatedLanding from '../components/AuthenticatedLanding.jsx';
import CoverPage from '../components/Cover/CoverPage.jsx';
import AboutUsPage from '../components/AboutUs/AboutUsPage.jsx';
import AboutOurDayPage from '../components/AboutOurDay/AboutOurDayPage.jsx';
import AboutOurHoneymoonPage from '../components/AboutOurHoneymoon/AboutOurHoneymoonPage.jsx';
import RequestsForTheDayPage from '../components/RequestsForTheDay/RequestsForTheDayPage.jsx';
import HoneymoonGiftListItemPage from '../components/HoneymoonGiftListItem/HoneymoonGiftListItemPage.jsx';
import WhereIsItPage from '../components/WhereIsIt/WhereIsItPage.jsx';
import UsersPage from '../components/Users/UsersPage.jsx';

function requireAuth(nextState, replaceState) {
    if (!loginStore.isLoggedIn()) {
        replaceState({ nextPathname: nextState.location.pathname }, 'admin/login');
    }
}

export default (
    <Route path="/" component={App}>
        <IndexRoute component={LandingPage}/>
        <Route path="basket" component={BasketSummaryPage} />
        <Route path="giver" component={GiverDetailsPage} />
        <Route path="admin" component={Admin}>
            <IndexRoute component={AuthenticatedLanding} onEnter={requireAuth}/>
            <Route path="login" component={LoginPage}/>
            <Route path="setup" component={SetupPage}/>
            <Route path="cover" component={CoverPage} onEnter={requireAuth}/>
            <Route path="aboutUs" component={AboutUsPage} onEnter={requireAuth}/>
            <Route path="aboutOurDay" component={AboutOurDayPage} onEnter={requireAuth}/>
            <Route path="aboutOurHoneymoon" component={AboutOurHoneymoonPage} onEnter={requireAuth}/>
            <Route path="requestsForTheDay" component={RequestsForTheDayPage} onEnter={requireAuth}/>
            <Route path="honeymoonGiftListItem" component={HoneymoonGiftListItemPage} onEnter={requireAuth}/>
            <Route path="whereIsIt" component={WhereIsItPage} onEnter={requireAuth}/>
            <Route path="users" component={UsersPage} onEnter={requireAuth}/>
            <Route path="*" component={NoMatchAdmin}/>
        </Route>
        <Route path="*" component={NoMatch}/>
    </Route>
);
