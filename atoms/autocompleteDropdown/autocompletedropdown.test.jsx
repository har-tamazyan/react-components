import {
  cleanup, render, screen,
} from '@testing-library/react';
import React from 'react';
import AutoCompleteDropDown from './index';


afterEach(cleanup);

describe('AutoCompleteDropDown Component Test', () => {
  it('should be selected 1 as we passed', async () => {
    const mockFunction = jest.fn();
    const testOptions = [{ label: 'test', value: 1 }, { label: 'test2', value: 2 }];
    render(
      <AutoCompleteDropDown
        handleChange={mockFunction}
        options={testOptions}
        isMultiSelect={false}
        isDropdownAsynchronous={false}
        placeholder={'testplaceholder'}
        title='testTitle'
        name="testName"
        shouldDropdownOverlay={false}
        selectedValues={[{ label: 'test', value: 1 }]}
        showLabels={false} />,
    );
    const testElement = await screen.findByText('test');
    expect(testElement).toBeInTheDocument();
  });
});
