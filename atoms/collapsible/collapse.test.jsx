import { render, screen } from '@testing-library/react';
import React from 'react';
import Collapse from './index';

describe('Test Collapse component', () => {
  it('should get right title according to props', async () => {
    render(<Collapse collapsed={true} title='testingCollapse' >
      {null}
      </Collapse>);
    const label = await screen.getByText('testingCollapse');
    expect(label).toBeInTheDocument();
  });
});
