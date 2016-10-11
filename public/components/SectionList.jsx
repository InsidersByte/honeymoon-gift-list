/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle, IconButton, Divider } from 'material-ui';
import Add from 'material-ui/svg-icons/content/add';
import Loader from './Loader';
import SortableContainer from './SortableContainer';
import SortableItem from './SortableItem';
import SectionListItem from './SectionListItem';

type PropsType = {
    loading: boolean,
    sections: Array<{
        id: number,
        title: string,
        hidden: boolean,
    }>,
    onAdd: Function,
    onSelect: Function,
    onMove: Function,
    onDrop: Function,
    onToggleVisibility: Function,
    onDelete: Function,
};

export default function SectionList({ loading, sections, onAdd, onSelect, onMove, onDrop, onToggleVisibility, onDelete }: PropsType) {
    return (
        <Paper>
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text="Sections" />
                </ToolbarGroup>

                <ToolbarGroup>
                    <IconButton touch onClick={onAdd}>
                        <Add />
                    </IconButton>
                </ToolbarGroup>
            </Toolbar>

            <Loader loading={loading}>
                <SortableContainer>
                    {
                        sections.map(section =>
                            <SortableItem
                                key={section.id}
                                id={section.id}
                                onMove={onMove}
                                onDrop={onDrop}
                            >
                                <SectionListItem
                                    section={section}
                                    onSelect={onSelect}
                                    onToggleVisibility={onToggleVisibility}
                                    onDelete={onDelete}
                                />

                                <Divider />
                            </SortableItem>
                        )
                    }
                </SortableContainer>
            </Loader>
        </Paper>
    );
}
