import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

function CoverForm(props) {
    return (
        <form onSubmit={props.onSubmit}>
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
        </form>
    );
}

CoverForm.propTypes = {
    cover: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
};

export default CoverForm;
