/* @flow */

import React from 'react';
import { Drawer, List, ListItem, makeSelectable } from 'material-ui';
import * as ROUTES from '../constants/routes';

type PropsType = {
  location: { pathname: string },
  docked: boolean,
  open: boolean,
  logout: Function,
  onChange: Function,
  onRequestChange: Function,
  user?: { name: string },
};

const SelectableList = makeSelectable(List);

export default function NavigationDrawer({ user, location, onChange, onRequestChange, docked, open, logout }: PropsType) {
  return (
    <Drawer onRequestChange={onRequestChange} docked={docked} open={open}>
      <SelectableList value={location.pathname} onChange={onChange} style={{ padding: 0 }}>
        <ListItem primaryText="Wedding Profile" value={ROUTES.WEDDING_PROFILE_ROUTE} />
        <ListItem primaryText="Sections" value={ROUTES.SECTIONS_ROUTE} />
        <ListItem primaryText="Wedding Party Members" value={ROUTES.WEDDING_PARTY_MEMBERS_ROUTE} />
        <ListItem primaryText="Gifts" value={ROUTES.GIFT_ROUTE} />
        <ListItem primaryText="Gift Sets" value={ROUTES.GIFT_SETS_ROUTE} />
        <ListItem primaryText="Users" value={ROUTES.USERS_ROUTE} />

        <ListItem
          primaryText={user && user.name}
          primaryTogglesNestedList
          nestedItems={[<ListItem primaryText="Your Profile" value={ROUTES.PROFILE_ROUTE} />, <ListItem primaryText="Logout" onClick={logout} />]}
        />
      </SelectableList>
    </Drawer>
  );
}
