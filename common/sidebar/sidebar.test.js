import { getIconSize } from './index';

describe('Test sidebar', () => {
    it('should get correct icon sizes', async () => {
        expect(getIconSize('analytics')).toBe(34);
        expect(getIconSize('configuration')).toBe(38.5);
        expect(getIconSize('dashboard')).toBe(32);
    });
});
