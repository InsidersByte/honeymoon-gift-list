import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default function WeddingPartyMemberForm(props) {
    return (
        <div>
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
        </div>
    );
}

WeddingPartyMemberForm.propTypes = {
    member: React.PropTypes.object.isRequired,
    title: React.PropTypes.oneOf(['Create', 'Update']),
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
};
