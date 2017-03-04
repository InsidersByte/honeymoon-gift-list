import React from 'react';
import { shallow, mount } from 'enzyme';
import { ConfirmationPage } from './ConfirmationPage';

const props = {
    loading: true,
    giftSet: {
        paymentMethod: 'method',
        paypalLink: 'http://paypal.me',
    },
    params: { giftSetId: 1 },
    actions: { loadGiftSet: jest.fn() },
};

describe('ConfirmationPage', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<ConfirmationPage {...props} />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should initialise state', () => {
        const wrapper = shallow(<ConfirmationPage />);

        expect(wrapper.state()).toEqual({ linkClicked: false });
    });

    it('should load giftSet on componentDidMount', () => {
        mount(<ConfirmationPage {...props} />);

        expect(props.actions.loadGiftSet).toHaveBeenCalledWith(1);
    });

    it('should render a <Confirmation /> component', () => {
        const wrapper = shallow(<ConfirmationPage />);

        expect(wrapper.find('Confirmation').length).toBe(1);
    });

    it('should set <Confirmation /> props', () => {
        const wrapper = shallow(<ConfirmationPage {...props} />);

        const confirmation = wrapper.find('Confirmation');

        expect(confirmation.prop('giftSet')).toBe(props.giftSet);
        expect(confirmation.prop('loading')).toBe(props.loading);
        expect(confirmation.prop('linkClicked')).toBe(false);
        expect(confirmation.prop('onLinkClicked')).toBeInstanceOf(Function);
    });

    it('should set linkClicked to true when link is clicked', () => {
        const wrapper = shallow(<ConfirmationPage />);

        expect(wrapper.state()).toEqual({ linkClicked: false });
        wrapper.instance().onLinkClicked();
        expect(wrapper.state()).toEqual({ linkClicked: true });
        wrapper.instance().onLinkClicked();
        expect(wrapper.state()).toEqual({ linkClicked: true });
    });
});
