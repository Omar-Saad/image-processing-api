import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import Constants from '../../utils/constants';
import fs from 'fs';
import ImageProcessing from '../../utils/imageProcessing';

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => {
  // check if query param is present
  if (!validateQueryParams(req)) {
    res.status(Constants.BAD_REQUEST_STATUS_CODE).send(Constants.BAD_REQUEST);
  } else {
    // read the image from the file system
    const query = req.query;
    const width = parseInt(query.width as string);
    const height = parseInt(query.height as string);
    const filename = query.filename as string;
    const imagePath = `./src/assets/original_images/${filename}`;
    const imageExtension = filename.split('.')[1];
    // check if image is cached in the server
    const cachedImagePath = `./src/assets/resized_images/${
      filename.split('.')[0]
    }_${width}_${height}.${imageExtension}`;
    if (fs.existsSync(cachedImagePath)) {
      // read the image from the file system
      const image = fs.readFileSync(cachedImagePath);
      res
        .writeHead(Constants.OK_STATUS_CODE, {
          'Content-Type': `image/${imageExtension}`,
        })
        .end(image);
      return;
    }

    // check if file exists
    // if not return 404
    // if exists resize the image and return the image
    if (!fs.existsSync(imagePath)) {
      res.status(Constants.NOT_FOUND_STATUS_CODE).send(Constants.NOT_FOUND);
    } else {
      // resize image
      // send the image as response
      ImageProcessing.resizeImage(width, height, imagePath)
        .then((data) => {
          // save image to resized images folder

          const resizedImagePath = `./src/assets/resized_images/${
            filename.split('.')[0]
          }_${width}_${height}.${imageExtension}`;
          fs.writeFileSync(resizedImagePath, data);
          // send image in html format
          // get image extension from filename

          res
            .writeHead(Constants.OK_STATUS_CODE, {
              'Content-Type': 'image/' + imageExtension,
            })
            .end(data);
        })
        .catch(() => {
          res
            .status(Constants.INTERNAL_SERVER_ERROR_STATUS_CODE)
            .send(Constants.INTERNAL_SERVER_ERROR);
        });
    }
  }
});

function validateQueryParams(
  req: Request<Record<string, string | number>>
): boolean {
  const query = req.query;

  if (Object.keys(query).length === 0) {
    return false;
  } else {
    if (
      Object.prototype.hasOwnProperty.call(query, 'filename') &&
      Object.prototype.hasOwnProperty.call(query, 'width') &&
      Object.prototype.hasOwnProperty.call(query, 'height')
    ) {
      // validate width and height
      const width = query.width as unknown as number;
      const height = query.height as unknown as number;
      if (!validateWidthAndHeight(width, height)) {
        return false;
      }
      if (!validateFileName(query.filename as string)) {
        return false;
      }
    } else {
      return false;
    }
  }

  return true;
  // throw new Error('Function not implemented.');
}

function validateWidthAndHeight(width: number, height: number): boolean {
  // check if width and height are numbers
  if (isNaN(width) || isNaN(height)) {
    return false;
  }

  if (width <= 0 || height <= 0) {
    return false;
  }
  return true;
}
function validateFileName(filename: string): boolean {
  // check if filename is valid
  if (filename === '') {
    return false;
  }
  return true;
}

export default {
  routes,
  validateQueryParams,
  validateWidthAndHeight,
  validateFileName,
};
