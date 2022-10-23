// import images api
import Validate from '../../../routes/api/images.js';

// test all functions in api/images.ts

describe('Validate given parameters', () => {
  it('should validate filename', () => {
    const filename = 'test.png';
    expect(Validate.validateFileName(filename)).toBe(true);
  });

  it('should validate width and height', () => {
    const width = 100;
    const height = -100;
    expect(Validate.validateWidthAndHeight(width, height)).toBe(false);
  });
});
