/* @flow */

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import type { Match } from 'react-router-dom';
import AdminContainer from '../AdminContainer';
import SetupPage from '../SetupPage';
import LoginPage from '../LoginPage';
import ResetPasswordPage from '../ResetPasswordPage';
import SignUpPage from '../SignUpPage';
import ProfilePage from '../ProfilePage';
import WeddingProfilePage from '../WeddingProfilePage';
import GiftsPage from '../GiftsPage';
import UsersPage from '../UsersPage';
import GiftSetsPage from '../GiftSetsPage';
import GiftSetPage from '../GiftSetPage';
import WeddingPartyMembersPage from '../WeddingPartyMembersPage';
import CreateWeddingPartyMemberPage from '../CreateWeddingPartyMemberPage';
import UpdateWeddingPartyMemberPage from '../UpdateWeddingPartyMemberPage';
import SectionsPage from '../SectionsPage';
import CreateSectionPage from '../CreateSectionPage';
import UpdateSectionPage from '../UpdateSectionPage';
import NoMatchAdmin from '../../components/NoMatchAdmin';
import AuthenticatedRoute from '../../components/AuthenticatedRoute';
import UnathenticatedRoute from '../../components/UnathenticatedRoute';

type PropsType = {
  match: Match,
};

const muiTheme = getMuiTheme();

const Admin = ({ match }: PropsType) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <AdminContainer>
      <Switch>
        <Route exact path={match.url} render={() => <Redirect to={`${match.url}/giftSet`} />} />

        <UnathenticatedRoute path={`${match.url}/setup`} component={SetupPage} />
        <UnathenticatedRoute path={`${match.url}/login`} component={LoginPage} />
        <UnathenticatedRoute path={`${match.url}/reset/:token`} component={ResetPasswordPage} />
        <UnathenticatedRoute path={`${match.url}/signUp/:token`} component={SignUpPage} />

        <AuthenticatedRoute path={`${match.url}/profile`} component={ProfilePage} />
        <AuthenticatedRoute path={`${match.url}/weddingProfile`} component={WeddingProfilePage} />
        <AuthenticatedRoute path={`${match.url}/gift`} component={GiftsPage} />
        <AuthenticatedRoute path={`${match.url}/section`} component={SectionsPage} />
        <AuthenticatedRoute path={`${match.url}/section/create`} component={CreateSectionPage} />
        <AuthenticatedRoute path={`${match.url}/section/:id`} component={UpdateSectionPage} />
        <AuthenticatedRoute path={`${match.url}/user`} component={UsersPage} />
        <AuthenticatedRoute path={`${match.url}/giftSet`} component={GiftSetsPage} />
        <AuthenticatedRoute path={`${match.url}/giftSet/:giftSetId`} component={GiftSetPage} />
        <AuthenticatedRoute path={`${match.url}/weddingPartyMember`} component={WeddingPartyMembersPage} />
        <AuthenticatedRoute path={`${match.url}/weddingPartyMember/create`} component={CreateWeddingPartyMemberPage} />
        <AuthenticatedRoute path={`${match.url}/weddingPartyMember/:id`} component={UpdateWeddingPartyMemberPage} />

        <Route component={NoMatchAdmin} />
      </Switch>
    </AdminContainer>
  </MuiThemeProvider>
);

export default Admin;
