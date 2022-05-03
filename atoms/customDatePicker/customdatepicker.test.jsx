import { render, screen } from '@testing-library/react';
import React from 'react';
import CustomDatePicker from './index';

describe('Custom DatePicker component', () => {
  it('should show start and end date with our expected format', async () => {
    const mockFunc = jest.fn();
    render(<CustomDatePicker onDateChange={mockFunc} name={'testName'} selectionRange={{
      endDate: 'Wed Mar 01 2000 10:19:55 GMT+0400 (Armenia Standard Time)',
      key: 'selection',
      startDate: 'Thu Dec 01 2022 10:19:55 GMT+0400 (Armenia Standard Time)',
    }} />);
    const testEndDate = await screen.getByText('Dec, 01 2022');
    const testStartDate = await screen.getByText('Mar, 01 2000');
    expect(testStartDate).toBeInTheDocument();
    expect(testEndDate).toBeInTheDocument();
  });
});
