import { render, screen } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import toaster from './index';

beforeAll(async () => {
   await toaster({
        type: 'success',
        msg: 'This is a toaster',
        unique: true,
      });
});
describe('toaster Component Test', () => {
    it('should return a toaster with message.', async () => {
        render(<ToastContainer/>);
        const toasterMsg = await screen.findByText(/This is a toaster/i);
        expect(toasterMsg).toBeInTheDocument();
    });
});
