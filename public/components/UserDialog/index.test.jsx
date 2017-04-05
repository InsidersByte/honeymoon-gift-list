import React from 'react';
import { shallow } from 'enzyme';
import UserDialog from './';

const onHide = jest.fn();
const onChange = jest.fn();
const onSubmit = jest.fn();

const props = {
  user: { email: 'test@test.com' },
  open: true,
  saving: true,
  onHide,
  onChange,
  onSubmit,
};

describe('UserDialog', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<UserDialog {...props} />);

    expect(wrapper).toMatchSnapshot();
    expect(onHide).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
