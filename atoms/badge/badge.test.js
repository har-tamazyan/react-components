import { render, screen } from '@testing-library/react';
import { convertHexToRGB } from 'src/web/ats/utils';
import Badge from './index';

describe('Badge Component Test', () => {
    it('should return a badge based on type and message', () => {
        render(<Badge type={'open'} msg={'open'}/>);
        const badgeLabel = screen.getByText(/open/i);
        expect(badgeLabel).toBeInTheDocument();
    });
    it('should return a badge with color based on type', () => {
        render(<Badge type={'open'} msg={'open'}/>);
        const badgeLabel = screen.getByText(/open/i);
        expect(badgeLabel).toHaveStyle({
            color: convertHexToRGB('#3C9D4F'),
          });
      });
});
