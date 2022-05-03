import { render, screen } from '@testing-library/react';
import Avatar from './index';

describe('Test avatar', () => {
  it('Avatar should return initials based on full name', async () => {
    render(<Avatar fullName={'John Doe'} />);
    const label = await screen.getByText('JD');
    expect(label).toBeInTheDocument();
  });
});
