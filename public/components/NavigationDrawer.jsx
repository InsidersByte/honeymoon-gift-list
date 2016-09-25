/* @flow */

import React from 'react';
import { Drawer, List, ListItem, MakeSelectable as makeSelectable } from 'material-ui';
import * as ROUTES from '../constants/routeConstants';

type PropsType = {
    isAuthenticated: boolean,
    location: { pathname: string },
    docked: boolean,
    open: boolean,
    logout: Function,
    onChange: Function,
    onRequestChange: Function,
    user?: { name: string },
};

const SelectableList = makeSelectable(List);

export default function NavigationDrawer({ isAuthenticated, user, location, onChange, onRequestChange, docked, open, logout }: PropsType) {
    let menuItems;

    if (!isAuthenticated) {
        menuItems = (
            <SelectableList
                value={location.pathname}
                onChange={onChange}
                style={{ padding: 0 }}
            >
                <ListItem primaryText="Login" value={ROUTES.LOGIN_ROUTE} />
            </SelectableList>
        );
    } else {
        menuItems = (
            <SelectableList
                value={location.pathname}
                onChange={onChange}
                style={{ padding: 0 }}
            >
                <ListItem
                    primaryText="Wedding Profile"
                    primaryTogglesNestedList
                    nestedItems={[
                        <ListItem primaryText="Cover" value={ROUTES.COVER_ROUTE} />,
                        <ListItem primaryText="About Us" value={ROUTES.ABOUT_US_ROUTE} />,
                        <ListItem primaryText="RSVP" value={ROUTES.RSVP_ROUTE} />,
                        <ListItem primaryText="About Our Day" value={ROUTES.ABOUT_OUR_DAY_ROUTE} />,
                        <ListItem primaryText="Wedding Party Members" value={ROUTES.WEDDING_PARTY_MEMBERS_ROUTE} />,
                        <ListItem primaryText="Local Flavour" value={ROUTES.LOCAL_FLAVOUR_ROUTE} />,
                        <ListItem primaryText="On the Day" value={ROUTES.ON_THE_DAY_ROUTE} />,
                        <ListItem primaryText="Wedding Playlist" value={ROUTES.WEDDING_PLAYLIST_ROUTE} />,
                        <ListItem primaryText="About Our Honeymoon" value={ROUTES.ABOUT_OUR_HONEYMOON_ROUTE} />,
                        <ListItem primaryText="Honeymoon Gift List" value={ROUTES.HONEYMOON_GIFT_LIST_ROUTE} />,
                        <ListItem primaryText="Honeymoon Gift List Items" value={ROUTES.HONEYMOON_GIFT_LIST_ITEM_ROUTE} />,
                    ]}
                />

                <ListItem primaryText="Gift Sets" value={ROUTES.GIFT_SETS_ROUTE} />
                <ListItem primaryText="Users" value={ROUTES.USERS_ROUTE} />

                <ListItem
                    primaryText={user && user.name}
                    primaryTogglesNestedList
                    nestedItems={[
                        <ListItem primaryText="Your Profile" value={ROUTES.PROFILE_ROUTE} />,
                        <ListItem primaryText="Logout" onClick={logout} />,
                    ]}
                />
            </SelectableList>
        );
    }

    return (
        <Drawer onRequestChange={onRequestChange} docked={docked} open={open}>
            {menuItems}
        </Drawer>
    );
}
