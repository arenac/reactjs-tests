import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { render, fireEvent, cleanup } from '@testing-library/react';

import TechListRedux from '~/components/TechListRedux';
import { addTech } from '~/store/modules/techs/actions';

jest.mock('react-redux');

describe('TechListRedux component', () => {
  it('shoul render tech list', () => {
    useSelector.mockImplementation(cb => cb({
      techs: ['Node.js', 'ReactJS']
    }));

    const { getByText, getByTestId, debug } = render(<TechListRedux />);

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByTestId('tech-list')).toContainElement(getByText('ReactJS'));
  });

  it('should be able to add new tech', () => {
    const { getByTestId, getByLabelText } = render(<TechListRedux />);

    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' }});
    fireEvent.submit(getByTestId('tech-form'));

    expect(dispatch).toHaveBeenCalledWith(addTech('Node.js'));
  });
});