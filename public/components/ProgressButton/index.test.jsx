import React from 'react';
import { shallow } from 'enzyme';
import ProgressButton from './';

describe('ProgressButton', () => {
  it('should render correctly when not saving', () => {
    const wrapper = shallow(<ProgressButton saving={false} label="Save" />);

    expect(wrapper).toMatchSnapshot();

    expect(wrapper.prop('label')).toEqual('Save');
    expect(wrapper.prop('disabled')).toEqual(false);
    expect(wrapper.prop('type')).toEqual('submit');
    expect(wrapper.prop('primary')).toEqual(true);
  });

  it('should render correctly when saving', () => {
    const wrapper = shallow(<ProgressButton saving label="Save" />);

    expect(wrapper).toMatchSnapshot();

    expect(wrapper.prop('label')).toEqual('Saving...');
    expect(wrapper.prop('disabled')).toEqual(true);
    expect(wrapper.prop('type')).toEqual('submit');
    expect(wrapper.prop('primary')).toEqual(true);
  });
});
