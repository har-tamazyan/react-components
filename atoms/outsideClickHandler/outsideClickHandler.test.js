import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OutsideAlerter from '.';

it('should test wrapper component to hide components', () => {
  let modal = true;
  const mockCallBack = jest.fn();

  const componentUI = render(
    <>
      <button id="testCloseButton" onClick={mockCallBack}>Close</button>
      <OutsideAlerter
        actionHandler={() => {
          modal = false;
        }}
      >
        {modal && <> Hello world</>}
      </OutsideAlerter>
    </>,
  );
  componentUI.getByText('Hello world');
  fireEvent.click(componentUI.getByText('Close'));
});
