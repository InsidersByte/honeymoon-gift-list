/* @flow */

import React, { Component, PropTypes } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router';
import connect from 'alt-utils/lib/connectToStores';
import LoginActions from '../actions/LoginActions';
import SetupActions from '../actions/SetupActions';
import LoginStore from '../stores/LoginStore';
import SetupStore from '../stores/SetupStore';
import * as routes from '../constants/routeConstants';
import Loader from '../components/common/Loader';

@connect
export default class Admin extends Component {
    static propTypes = {
        auth: PropTypes.shape({
            isLoggedIn: PropTypes.bool.isRequired,
            user: PropTypes.shape({
                name: PropTypes.string,
            }),
        }).isRequired,
        setup: PropTypes.shape({
            loading: PropTypes.bool.isRequired,
        }),
        children: PropTypes.element.isRequired,
    };

    static getStores = () => [LoginStore, SetupStore];
    static getPropsFromStores = () => ({ auth: LoginStore.getState(), setup: SetupStore.getState() });

    state = { ...LoginStore.getState(), ...SetupStore.getState() };

    componentDidMount() {
        SetupActions.fetch();
    }

    logout(event: SyntheticEvent) {
        event.preventDefault();
        LoginActions.logoutUser();
    }

    render() {
        let headerItems;

        const { auth: { isLoggedIn, user }, setup: { loading } } = this.props;

        const viewSiteLink = <li><Link to={routes.HOME_ROUTE} target="_blank" rel="noopener noreferrer">View Site</Link></li>;

        if (!isLoggedIn) {
            headerItems = (
                <Nav pullRight>
                    {viewSiteLink}

                    <li>
                        <Link to={routes.LOGIN_ROUTE}>Login</Link>
                    </li>
                </Nav>
            );
        } else {
            headerItems = (
                <Nav pullRight>
                    <NavDropdown id="weddingProfile" title="Wedding Profile">
                        <li>
                            <Link to={routes.COVER_ROUTE}>Cover</Link>
                        </li>
                        <li>
                            <Link to={routes.ABOUT_US_ROUTE}>About Us</Link>
                        </li>
                        <li>
                            <Link to={routes.RSVP_ROUTE}>RSVP</Link>
                        </li>
                        <li>
                            <Link to={routes.ABOUT_OUR_DAY_ROUTE}>About Our Day</Link>
                        </li>
                        <li>
                            <Link to={routes.WEDDING_PARTY_MEMBERS_ROUTE}>Wedding Party Members</Link>
                        </li>
                        <li>
                            <Link to={routes.LOCAL_FLAVOUR_ROUTE}>Local Flavour</Link>
                        </li>
                        <li>
                            <Link to={routes.ON_THE_DAY_ROUTE}>On the Day</Link>
                        </li>
                        <li>
                            <Link to={routes.WEDDING_PLAYLIST_ROUTE}>Wedding Playlist</Link>
                        </li>
                        <li>
                            <Link to={routes.ABOUT_OUR_HONEYMOON_ROUTE}>About Our Honeymoon</Link>
                        </li>
                        <li>
                            <Link to={routes.HONEYMOON_GIFT_LIST_ROUTE}>Honeymoon Gift List</Link>
                        </li>
                        <li>
                            <Link to={routes.HONEYMOON_GIFT_LIST_ITEM_ROUTE}>Honeymoon Gift List Items</Link>
                        </li>
                    </NavDropdown>

                    <li>
                        <Link to={routes.GIFT_SETS_ROUTE}>Gift Sets</Link>
                    </li>

                    <li>
                        <Link to={routes.USERS_ROUTE}>Users</Link>
                    </li>

                    {viewSiteLink}

                    <NavDropdown id="userProfile" title={user.name}>
                        <li>
                            <Link to={routes.PROFILE_ROUTE}>Your Profile</Link>
                        </li>
                        <li>
                            <a href="#" onClick={this.logout}>Logout</a>
                        </li>
                    </NavDropdown>
                </Nav>
            );
        }

        return (
            <Loader loading={loading}>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to={routes.ADMIN_ROUTE}>Our Wedding Heroes</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>

                    <Navbar.Collapse>
                        {headerItems}
                    </Navbar.Collapse>
                </Navbar>

                <div className="container">
                    {this.props.children}
                </div>
            </Loader>
        );
    }
}
