import React from 'react';
import { Input, Button, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { WEDDING_PARTY_MEMBERS_ROUTE } from '../../constants/routes.constants';

export default function WeddingPartyMemberForm(props) {
    return (
        <form onSubmit={props.onSubmit}>
            <Input
                name="name"
                type="text"
                label="Name"
                placeholder="Enter name"
                value={props.member.name}
                onChange={props.onChange}
                required
            />

            <Input
                name="imageUrl"
                type="url"
                label="Image Url"
                placeholder="Enter image url"
                value={props.member.imageUrl}
                onChange={props.onChange}
                required
            />

            <Input
                name="description"
                type="textarea"
                rows="10"
                label="Description"
                placeholder="Enter description"
                value={props.member.description}
                onChange={props.onChange}
                required
            />

            <ButtonToolbar>
                <Button type="submit" bsStyle="primary">Create</Button>
                <Link className="btn btn-default" to={WEDDING_PARTY_MEMBERS_ROUTE}>Back</Link>
            </ButtonToolbar>
        </form>
    );
}

WeddingPartyMemberForm.propTypes = {
    member: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
};
