/* @flow */

import React from 'react';
import { Dialog, FlatButton, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui';

type PropsType = {
    open: boolean,
    handleClose: Function,
};

const styles = {
    table: {
        marginTop: 1,
    },
};

export default function MarkdownHelp({ open, handleClose }: PropsType) {
    const actions = [
        <FlatButton
            label="Close"
            onTouchTap={handleClose}
        />,
    ];

    return (
        <Dialog
            title="Markdown Help"
            actions={actions}
            open={open}
            onRequestClose={handleClose}
            autoScrollBodyContent
        >
            <Table selectable={false} style={styles.table}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Markdown</TableHeaderColumn>
                        <TableHeaderColumn>Result</TableHeaderColumn>
                    </TableRow>
                </TableHeader>

                <TableBody
                    displayRowCheckbox={false}
                    showRowHover
                >
                    <TableRow>
                        <TableRowColumn>**text**</TableRowColumn>
                        <TableRowColumn><strong>Bold</strong></TableRowColumn>
                    </TableRow>

                    <TableRow>
                        <TableRowColumn>*text*</TableRowColumn>
                        <TableRowColumn><em>Emphasize</em></TableRowColumn>
                    </TableRow>

                    <TableRow>
                        <TableRowColumn>~~text~~</TableRowColumn>
                        <TableRowColumn><del>Strike-through</del></TableRowColumn>
                    </TableRow>

                    <TableRow>
                        <TableRowColumn>[title](http://)</TableRowColumn>
                        <TableRowColumn><a href="#link">Link</a></TableRowColumn>
                    </TableRow>

                    <TableRow>
                        <TableRowColumn>`code`</TableRowColumn>
                        <TableRowColumn><code>Inline Code</code></TableRowColumn>
                    </TableRow>

                    <TableRow>
                        <TableRowColumn>![alt](http://)</TableRowColumn>
                        <TableRowColumn>Image</TableRowColumn>
                    </TableRow>

                    <TableRow>
                        <TableRowColumn>* item</TableRowColumn>
                        <TableRowColumn>List</TableRowColumn>
                    </TableRow>

                    <TableRow>
                        <TableRowColumn>&#62; quote</TableRowColumn>
                        <TableRowColumn>Blockquote</TableRowColumn>
                    </TableRow>

                    <TableRow>
                        <TableRowColumn>==Highlight==</TableRowColumn>
                        <TableRowColumn><mark>Highlight</mark></TableRowColumn>
                    </TableRow>

                    <TableRow>
                        <TableRowColumn># Heading</TableRowColumn>
                        <TableRowColumn>H1</TableRowColumn>
                    </TableRow>

                    <TableRow>
                        <TableRowColumn>## Heading</TableRowColumn>
                        <TableRowColumn>H2</TableRowColumn>
                    </TableRow>

                    <TableRow>
                        <TableRowColumn>### Heading</TableRowColumn>
                        <TableRowColumn>H3</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        </Dialog>
    );
}
