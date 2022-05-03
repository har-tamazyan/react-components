import React from 'react';
import { render } from '@testing-library/react';
import Checkbox from '.';
import { getStyledComponentStyles } from '../../../../utils';

describe('Test input checkbox', () => {
    it('render checkbox', async () => {
        const { getByTestId } = render(
            <Checkbox
                checked={false}
                onChange={() => { }}
                styles={{ borderColor: 'none', backgroundColor: '#ddd', strokeColor: '#fff' }}
                name={'testbox'}
            />,
        );
        getByTestId('checkbox');
    });

    it('render checked checkbox', async () => {
        const { getByTestId } = render(
            <Checkbox
                checked={false}
                onChange={() => { }}
                styles={{ borderColor: 'none', backgroundColor: '#ddd', strokeColor: '#fff' }}
                name={'testbox'}
            />,
        );
        getByTestId('checkboxIcon');

        const CheckboxIconStyles = getStyledComponentStyles('checkboxIcon');
        expect(CheckboxIconStyles.visibility).toBe('hidden');
    });

    it('render unchecked checkbox', async () => {
        const { getByTestId } = render(
            <Checkbox
                checked
                onChange={() => { }}
                styles={{ borderColor: 'none', backgroundColor: '#ddd', strokeColor: '#fff' }}
                name={'testbox'}
            />,
        );
        getByTestId('checkboxIcon');

        const CheckboxIconStyles = getStyledComponentStyles('checkboxIcon');
        expect(CheckboxIconStyles.visibility).toBe('visible');
    });
});
