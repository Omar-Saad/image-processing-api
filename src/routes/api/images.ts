import express from 'express';
import { Request } from 'express-serve-static-core';
import Constants from '../../utils/constants';
import sharp from 'sharp';
import fs from 'fs';

const routes = express.Router();

routes.get('/', (req, res) => {
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
    console.log(typeof width);
    // check if file exists
    // if not return 404
    // if exists resize the image and return the image
    if (!fs.existsSync(imagePath)) {
      res.status(Constants.NOT_FOUND_STATUS_CODE).send(Constants.NOT_FOUND);
    } else {
      // resize image
      // send the image as response
      sharp(imagePath)
        .resize(width, height)
        .toBuffer()
        .then((data) => {
          // save image to resized images folder
          const resizedImagePath = `./src/assets/resized_images/${filename}`;
          fs.writeFileSync(resizedImagePath, data);
          // send image in html format
          // get image extension from filename
          const imageExtension = filename.split('.')[1];
          res
            .writeHead(Constants.OK_STATUS_CODE, {
              'Content-Type': 'image/' + imageExtension,
            })
            .end(data);
        })
        .catch((err) => {
          res
            .status(Constants.INTERNAL_SERVER_ERROR_STATUS_CODE)
            .send(Constants.INTERNAL_SERVER_ERROR);
        });
    }
  }
});

function validateQueryParams(
  req: Request<Record<string, string | number>>,
): boolean {
  const query = req.query;

  if (Object.keys(query).length === 0) {
    return false;
  } else {
    if (
      query.hasOwnProperty('width') &&
      query.hasOwnProperty('height') &&
      query.hasOwnProperty('filename')
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
  validateFileName
};
