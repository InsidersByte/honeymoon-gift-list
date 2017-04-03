import React from 'react';
import { shallow } from 'enzyme';
import Form from './';

describe('Form', () => {
  describe('loading', () => {
    it('should render correctly', () => {
      const props = {
        loading: true,
      };

      const wrapper = shallow(<Form {...props} />);

      expect(wrapper).toMatchSnapshot();
    });

    it('should render Loader', () => {
      const props = {
        loading: true,
      };

      const wrapper = shallow(<Form {...props} />);
      const loader = wrapper.find('Loader');

      expect(loader.length).toBe(1);
      expect(loader.props()).toEqual({ loading: true });
    });
  });

  describe('not loading', () => {
    it('should render correctly', () => {
      const props = {
        loading: false,
        saving: false,
        onSubmit: jest.fn(),
      };

      const wrapper = shallow(<Form {...props}><h1>hello world</h1></Form>);

      expect(wrapper).toMatchSnapshot();
    });

    it('should render a form', () => {
      const props = {
        loading: false,
        saving: false,
        onSubmit: jest.fn(),
      };

      const wrapper = shallow(<Form {...props}><h1>hello world</h1></Form>);

      const form = wrapper.find('form');

      expect(form.length).toBe(1);
      expect(form.prop('onSubmit')).toEqual(props.onSubmit);
    });

    it('should render a fieldset', () => {
      const props = {
        loading: false,
        saving: false,
        onSubmit: jest.fn(),
      };

      const wrapper = shallow(<Form {...props}><h1>hello world</h1></Form>);

      const fieldset = wrapper.find('fieldset');

      expect(fieldset.length).toBe(1);
      expect(fieldset.prop('disabled')).toBe(false);
      expect(fieldset.prop('style')).toEqual({ margin: 0, padding: 0, border: 'none' });
    });

    it('should render children', () => {
      const props = {
        loading: false,
        saving: false,
        onSubmit: jest.fn(),
      };

      const wrapper = shallow(<Form {...props}><h1>hello world</h1></Form>);

      const fieldset = wrapper.find('fieldset');
      const children = fieldset.children();

      expect(children.html()).toBe('<h1>hello world</h1>');
    });

    it('should set the fieldset to disabled when saving', () => {
      const props = {
        loading: false,
        saving: true,
        onSubmit: jest.fn(),
      };

      const wrapper = shallow(<Form {...props}><h1>hello world</h1></Form>);

      const fieldset = wrapper.find('fieldset');

      expect(fieldset.length).toBe(1);
      expect(fieldset.prop('disabled')).toBe(true);
      expect(fieldset.prop('style')).toEqual({ margin: 0, padding: 0, border: 'none' });
    });

    it('should call onSubmit when submitting the form', () => {
      const props = {
        loading: false,
        saving: true,
        onSubmit: jest.fn(),
      };

      const wrapper = shallow(<Form {...props}><h1>hello world</h1></Form>);

      const form = wrapper.find('form');

      expect(props.onSubmit).not.toHaveBeenCalled();
      form.simulate('submit');
      expect(props.onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
