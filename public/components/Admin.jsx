import React from 'react';
import loginStore from '../stores/LoginStore';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router';
import auth from '../helpers/auth';
import * as routes from '../constants/routeConstants';

class App extends React.Component {
    constructor() {
        super();

        this.state = this.getLoginState();
    }

    componentDidMount() {
        loginStore.listen(this.onStoreChange);
    }

    componentWillUnmount() {
        loginStore.unlisten(this.onStoreChange);
    }

    onStoreChange = () => {
        this.setState(this.getLoginState());
    };

    getLoginState() {
        return {
            userLoggedIn: loginStore.getState().isLoggedIn,
        };
    }

    logout(event) {
        event.preventDefault();

        auth.logout();
    }

    render() {
        let headerItems;

        const backToSiteLink = (
            <li>
                <Link to={routes.HOME_ROUTE}>Back to Site</Link>
            </li>
        );

        if (!this.state.userLoggedIn) {
            headerItems = (
                <Nav pullRight>
                    {backToSiteLink}

                    <li>
                        <Link to={routes.LOGIN_ROUTE}>Login</Link>
                    </li>
                </Nav>
            );
        } else {
            headerItems = (
                <Nav pullRight>
                    <NavDropdown title="Wedding Profile" id="weddingProfileDropdown">
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

                    {backToSiteLink}

                    <li>
                        <a href="#" onClick={this.logout}>Logout</a>
                    </li>
                </Nav>
            );
        }

        return (
            <div>
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
                    {this.props.children && React.cloneElement(this.props.children, {
                        toastSuccess: this.props.toastSuccess,
                        toastError: this.props.toastError,
                    })}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.element.isRequired,
    toastSuccess: React.PropTypes.func.isRequired,
    toastError: React.PropTypes.func.isRequired,
};

export default App;
