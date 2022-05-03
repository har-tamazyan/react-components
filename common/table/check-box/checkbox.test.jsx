import {
 cleanup, render, screen, fireEvent,
} from '@testing-library/react';
import React from 'react';
import { CheckBoxRowComponent } from './index';


afterEach(cleanup);

describe('Checkbox Component Test', () => {
  it('should be checked after clicking on it', async () => {
    const getToggleRowSelectedProps = jest.fn();
    render(
        <CheckBoxRowComponent row = {{ getToggleRowSelectedProps }}/>,
    );
    const element = await screen.findByRole('checkbox');
    expect(element).not.toBeChecked();
    fireEvent.click(element);
    expect(element).toBeChecked();
  });
});
