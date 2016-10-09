/* @flow */

import React from 'react';
import { Paper, Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui';
import { List, ListItem } from 'material-ui/List';
import Loader from './Loader';

type PropsType = {
    loading: boolean,
    sections: Array<{
        id: number,
        title: string,
    }>,
};

export default function Sections({ loading, sections }: PropsType) {
    return (
        <Loader loading={loading}>
            <Paper>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text="Sections" />
                    </ToolbarGroup>
                </Toolbar>

                <List>
                    {sections.map(({ id, title }) =>
                        <ListItem key={id} primaryText={title} />
                    )}
                </List>
            </Paper>
        </Loader>
    );
}
