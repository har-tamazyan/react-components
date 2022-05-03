import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import theme from 'src/web/ats/theme';
import { ThemeProvider } from 'styled-components';
import { NAME_VALIDATION_REGEX_PATTERN } from 'src/constants';
import Input from './index';


afterEach(cleanup);

describe('Input Component Test', () => {
  it('should return expected component properties based on props being pass to component (Year)', async () => {
    const mockFunc = jest.fn();
    const isEditProfile = false;
    render(
      <ThemeProvider theme={{ ...theme.default }}>
        <Input
          type='number'
          placeholder={'Years'}
          onChange={mockFunc}
          min={0}
          required={true}
          max={30}
          step={1}
          defaultValue={5}
          isDisabled={!isEditProfile}
          isPlaceholderLabel={true} />
      </ThemeProvider>,
    );
    const element = await screen.getByText('Years');
    const testElement = screen.getByTestId('testingId');
    expect(element).toBeInTheDocument();
    expect(testElement.value).toBe('5');
    expect(testElement.disabled).toBe(true);
    expect(testElement.required).toBe(true);
  });
  it('should return expected component properties based on props being pass to component (Last Name)', async () => {
    const mockFunc = jest.fn();
    const isEditProfile = false;
    render(
      <ThemeProvider theme={{ ...theme.default }}>
        <Input
          label='name'
          isDisabled={!isEditProfile}
          onChange={mockFunc('last_name')}
          pattern={NAME_VALIDATION_REGEX_PATTERN}
          title={'Name should not contain special characters (eg: @, $, %, ?, }, | etc.) and numbers'}
          defaultValue={'test-candidate'}
          required={true} />
      </ThemeProvider>,
    );
    const testElement = await screen.getByTestId('testingId');
    const testlabel = await screen.getByText('name');
    expect(testElement.value).toBe('test-candidate');
    expect(testElement.disabled).toBe(true);
    expect(testElement.pattern).toBe('[^@_#~%&=<>!\\d\\?\\$\\*\\|\\^\\(\\)\\{\\}\\[\\]\\+\\/\\\\]+');
    expect(testElement.required).toBe(true);
    expect(mockFunc).toBeCalledTimes(1);
    expect(testlabel).toBeInTheDocument();
  });


  it('should return expected component properties based on props being pass to component (Date)', async () => {
    const mockFunc = jest.fn();
    const isDisabled = false;
    const DEFAULT_MIN_DATE = '1970-01-01';
    const DEFAULT_MAX_DATE = '2023-01-01';
    render(
      <ThemeProvider theme={{ ...theme.default }}>
        <Input
          label='date'
          type='date'
          defaultValue={'2022-04-03'}
          min={DEFAULT_MIN_DATE}
          max={DEFAULT_MAX_DATE}
          isDisabled={isDisabled}
          onChange={mockFunc(0, 'start_date')} />
      </ThemeProvider>,
    );

    const testElement = await screen.getByTestId('testingId');
    const testlabel = await screen.getByText('date');
    expect(testElement.value).toBe('2022-04-03');
    expect(testElement.max).toBe('2023-01-01');
    expect(testElement.disabled).toBe(false);
    expect(testElement.required).not.toBe(true);
    expect(mockFunc).toBeCalledTimes(1);
    expect(testlabel).toBeInTheDocument();
  });
});
