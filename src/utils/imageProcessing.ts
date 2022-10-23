import sharp from 'sharp';

// resize image
function resizeImage(
  width: number,
  height: number,
  imagePath: string
): Promise<Buffer> {
  return sharp(imagePath).resize(width, height).toBuffer();
}

// export all functions
export default {
  resizeImage,
};
