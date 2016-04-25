import React from 'react';
import { FormGroup, ControlLabel, FormControl, Checkbox, Button } from 'react-bootstrap';

export default function HoneymoonGiftListForm(props) {
    let offlinePaymentMessageInput = null;
    let disclaimerMessageInput = null;

    if (props.honeymoonGiftList.showOfflinePaymentMessage === true) {
        offlinePaymentMessageInput = (
            <FormGroup>
                <ControlLabel>Offline Payment Message</ControlLabel>
                <FormControl
                    name="offlinePaymentMessage"
                    componentClass="textarea"
                    rows="3"
                    placeholder="Enter your offline payment message"
                    value={props.honeymoonGiftList.offlinePaymentMessage}
                    onChange={props.onChange}
                    required
                />
            </FormGroup>
        );
    }

    if (props.honeymoonGiftList.showDisclaimerMessage === true) {
        disclaimerMessageInput = (
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
        <form onSubmit={props.onSubmit}>
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
                name="showOfflinePaymentMessage"
                value={props.honeymoonGiftList.showOfflinePaymentMessage}
                checked={props.honeymoonGiftList.showOfflinePaymentMessage}
                onChange={props.onChange}
            >
                Show Offline Payment Message
            </Checkbox>

            {offlinePaymentMessageInput}

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
        </form>
    );
}

HoneymoonGiftListForm.propTypes = {
    honeymoonGiftList: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
};
