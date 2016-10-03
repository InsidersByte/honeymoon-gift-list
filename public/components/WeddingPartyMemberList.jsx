/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, IconButton } from 'material-ui';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';

type PropsType = {
    weddingPartyMembers: Array<Object>,
    loading: boolean,
    onAdd: Function,
};

export default function WeddingPartyMembersList({ onAdd }: PropsType) {
    return (
        <Paper>
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text="Wedding Party Members" />
                </ToolbarGroup>

                <ToolbarGroup>
                    <IconButton touch onClick={onAdd}>
                        <AddCircleOutline />
                    </IconButton>
                </ToolbarGroup>
            </Toolbar>
        </Paper>
    );
}
