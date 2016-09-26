import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { WEDDING_PARTY_MEMBERS_ROUTE } from '../../constants/routeConstants';
import Form from '../Form';

export default function WeddingPartyMemberForm(props) {
    return (
        <Form onSubmit={props.onSubmit} loading={props.loading} saving={props.saving}>
            <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    value={props.member.name}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                    name="title"
                    type="text"
                    placeholder="Enter title"
                    value={props.member.title}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Image Url</ControlLabel>
                <FormControl
                    name="imageUrl"
                    type="url"
                    placeholder="Enter image url"
                    value={props.member.imageUrl}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                    name="description"
                    componentClass="textarea"
                    rows="10"
                    placeholder="Enter description"
                    value={props.member.description}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <ButtonToolbar>
                <Button type="submit" bsStyle="primary">{props.title}</Button>
                <Link className="btn btn-default" to={WEDDING_PARTY_MEMBERS_ROUTE}>Back</Link>
            </ButtonToolbar>
        </Form>
    );
}

WeddingPartyMemberForm.propTypes = {
    member: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        imageUrl: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
    }).isRequired,
    title: React.PropTypes.oneOf(['Create', 'Update']),
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    saving: React.PropTypes.bool.isRequired,
};
