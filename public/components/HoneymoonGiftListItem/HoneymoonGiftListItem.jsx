import React from 'react';
import { Button, Modal, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Form from '../common/Form';

export default class HoneymoonGiftListItem extends React.Component {
    static propTypes = {
        item: React.PropTypes.object.isRequired,
        show: React.PropTypes.bool.isRequired,
        onHide: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired,
        loading: React.PropTypes.bool.isRequired,
        saving: React.PropTypes.bool.isRequired,
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.props.item);
    };

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Form onSubmit={this.handleSubmit} loading={this.props.loading} saving={this.props.saving}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Item</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormGroup>
                            <ControlLabel>Image Url</ControlLabel>
                            <FormControl
                                name="imageUrl"
                                type="url"
                                placeholder="Enter url"
                                value={this.props.item.imageUrl}
                                onChange={this.props.onChange}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl
                                name="name"
                                type="text"
                                placeholder="Enter name"
                                value={this.props.item.name}
                                onChange={this.props.onChange}
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
                                value={this.props.item.description}
                                onChange={this.props.onChange}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Requested</ControlLabel>
                            <FormControl
                                name="requested"
                                type="number"
                                placeholder="Enter requested"
                                value={this.props.item.requested}
                                onChange={this.props.onChange}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Price (£)</ControlLabel>
                            <FormControl
                                name="price"
                                type="number"
                                placeholder="Enter price"
                                value={this.props.item.price}
                                onChange={this.props.onChange}
                                required
                            />
                        </FormGroup>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="primary" type="submit">Save</Button>
                        <Button onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}
