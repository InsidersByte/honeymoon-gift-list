import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import Form from '../common/Form';

export default function CoverForm(props) {
    return (
        <Form onSubmit={props.onSubmit} loading={props.loading} saving={props.saving}>
            <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                    name="title"
                    type="text"
                    placeholder="Enter title"
                    value={props.cover.title}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Cover Image Url</ControlLabel>
                <FormControl
                    name="imageUrl"
                    type="url"
                    placeholder="Enter url"
                    value={props.cover.imageUrl}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Wedding Date</ControlLabel>
                <FormControl
                    name="weddingDate"
                    type="date"
                    placeholder="Enter wedding date"
                    value={props.cover.weddingDate}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <Button type="submit" bsStyle="primary" block>Update</Button>
        </Form>
    );
}

CoverForm.propTypes = {
    cover: React.PropTypes.shape({
        title: React.PropTypes.string.isRequired,
        imageUrl: React.PropTypes.string.isRequired,
        weddingDate: React.PropTypes.string.isRequired,
    }).isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    saving: React.PropTypes.bool.isRequired,
};
