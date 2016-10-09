/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, IconButton, Divider } from 'material-ui';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import Loader from './Loader';
import WeddingPartyMemberItem from './WeddingPartyMemberItem';
import SortableContainer from './SortableContainer';
import SortableItem from './SortableItem';

type PropsType = {
    weddingPartyMembers: Array<{
        id: number,
        name: string,
        title: string,
        imageUrl: string,
        description: string,
    }>,
    loading: boolean,
    onAdd: Function,
    onSelect: Function,
    onMove: Function,
    onDrop: Function,
    onDelete: Function,
};

export default function WeddingPartyMembersList({ weddingPartyMembers, loading, onAdd, onSelect, onMove, onDrop, onDelete }: PropsType) {
    return (
        <Loader loading={loading}>
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

                <SortableContainer>
                    {
                        weddingPartyMembers.map(weddingPartyMember =>
                            <SortableItem
                                key={weddingPartyMember.id}
                                id={weddingPartyMember.id}
                                onMove={onMove}
                                onDrop={onDrop}
                            >
                                <WeddingPartyMemberItem
                                    weddingPartyMember={weddingPartyMember}
                                    onSelect={onSelect}
                                    onDelete={onDelete}
                                />

                                <Divider />
                            </SortableItem>
                        )
                    }
                </SortableContainer>
            </Paper>
        </Loader>
    );
}
