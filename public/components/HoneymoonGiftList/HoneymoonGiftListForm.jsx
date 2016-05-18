import React from 'react';
import { FormGroup, ControlLabel, FormControl, Checkbox, Button } from 'react-bootstrap';
import Form from '../common/Form';

export default function HoneymoonGiftListForm(props) {
    let paymentMessageInput = null;
    let disclaimerMessageInput = null;

    if (props.honeymoonGiftList.showPaymentMessage === true) {
        paymentMessageInput = ( // eslint-disable-line no-extra-parens
            <FormGroup>
                <ControlLabel>Offline Payment Message</ControlLabel>
                <FormControl
                    name="paymentMessage"
                    componentClass="textarea"
                    rows="3"
                    placeholder="Enter your payment message"
                    value={props.honeymoonGiftList.paymentMessage}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>
        );
    }

    if (props.honeymoonGiftList.showDisclaimerMessage === true) {
        disclaimerMessageInput = ( // eslint-disable-line no-extra-parens
            <FormGroup>
                <ControlLabel>Disclaimer Message</ControlLabel>
                <FormControl
                    name="disclaimerMessage"
                    componentClass="textarea"
                    rows="3"
                    placeholder="Enter your disclaimer message"
                    value={props.honeymoonGiftList.disclaimerMessage}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>
        );
    }

    return (
        <Form onSubmit={props.onSubmit} loading={props.loading} saving={props.saving}>
            <FormGroup>
                <ControlLabel>Content</ControlLabel>
                <FormControl
                    name="content"
                    componentClass="textarea"
                    rows="10"
                    placeholder="Enter information about your day"
                    value={props.honeymoonGiftList.content}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>

            <Checkbox
                name="showPaymentMessage"
                value={props.honeymoonGiftList.showPaymentMessage}
                checked={props.honeymoonGiftList.showPaymentMessage}
                onChange={props.onChange}
            >
                Show Payment Message
            </Checkbox>

            {paymentMessageInput}

            <Checkbox
                name="showDisclaimerMessage"
                value={props.honeymoonGiftList.showDisclaimerMessage}
                checked={props.honeymoonGiftList.showDisclaimerMessage}
                onChange={props.onChange}
            >
                Show Disclaimer
            </Checkbox>

            {disclaimerMessageInput}

            <Button type="submit" bsStyle="primary" block>Update</Button>
        </Form>
    );
}

HoneymoonGiftListForm.propTypes = {
    honeymoonGiftList: React.PropTypes.shape({
        showPaymentMessage: React.PropTypes.bool.isRequired,
        showDisclaimerMessage: React.PropTypes.bool.isRequired,
        paymentMessage: React.PropTypes.string.isRequired,
        disclaimerMessage: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired,
    }).isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    saving: React.PropTypes.bool.isRequired,
};
