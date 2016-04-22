import React from 'react';
import { Table } from 'react-bootstrap';
import WeddingPartyMemberRow from './WeddingPartyMemberRow.jsx';

export default function WeddingPartyMembersTable(props) {
    return (
        <Table striped bordered condensed hover responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Image Url</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
            {props
                .members
                .map(member => (
                    <WeddingPartyMemberRow
                        key={member._id} // eslint-disable-line no-underscore-dangle
                        member={member}
                        onDelete={props.onDelete}
                        onSelect={props.onSelect}
                    />
                ))
            }
            </tbody>
        </Table>
    );
}

WeddingPartyMembersTable.propTypes = {
    members: React.PropTypes.array.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
};

WeddingPartyMembersTable.defaultProps = {
    members: [],
};
