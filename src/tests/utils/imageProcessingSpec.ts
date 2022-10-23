import ImageProcessing from '../../utils/imageProcessing';

// validate image proccesing utils

describe('Resize image', () => {
  it('should resize image', () => {
    const width = 100;
    const height = 100;
    const imagePath = './src/assets/images/test.png';
    ImageProcessing.resizeImage(width, height, imagePath).then((data) => {
      // check if image is resized
      expect(data).toBeInstanceOf(Buffer);
    });
  });
});
