"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = __importDefault(require("../../utils/constants"));
const fs_1 = __importDefault(require("fs"));
const imageProcessing_1 = __importDefault(require("../../utils/imageProcessing"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    // check if query param is present
    if (!validateQueryParams(req)) {
        res.status(constants_1.default.BAD_REQUEST_STATUS_CODE).send(constants_1.default.BAD_REQUEST);
    }
    else {
        // read the image from the file system
        const query = req.query;
        const width = parseInt(query.width);
        const height = parseInt(query.height);
        const filename = query.filename;
        const imagePath = `./src/assets/original_images/${filename}`;
        const imageExtension = filename.split('.')[1];
        // check if image is cached in the server
        const cachedImagePath = `./src/assets/resized_images/${filename.split('.')[0]}_${width}_${height}.${imageExtension}`;
        if (fs_1.default.existsSync(cachedImagePath)) {
            // read the image from the file system
            const image = fs_1.default.readFileSync(cachedImagePath);
            res
                .writeHead(constants_1.default.OK_STATUS_CODE, {
                'Content-Type': `image/${imageExtension}`,
            })
                .end(image);
            return;
        }
        // check if file exists
        // if not return 404
        // if exists resize the image and return the image
        if (!fs_1.default.existsSync(imagePath)) {
            res.status(constants_1.default.NOT_FOUND_STATUS_CODE).send(constants_1.default.NOT_FOUND);
        }
        else {
            // resize image
            // send the image as response
            imageProcessing_1.default.resizeImage(width, height, imagePath)
                .then((data) => {
                // save image to resized images folder
                const resizedImagePath = `./src/assets/resized_images/${filename.split('.')[0]}_${width}_${height}.${imageExtension}`;
                fs_1.default.writeFileSync(resizedImagePath, data);
                // send image in html format
                // get image extension from filename
                res
                    .writeHead(constants_1.default.OK_STATUS_CODE, {
                    'Content-Type': 'image/' + imageExtension,
                })
                    .end(data);
            })
                .catch(() => {
                res
                    .status(constants_1.default.INTERNAL_SERVER_ERROR_STATUS_CODE)
                    .send(constants_1.default.INTERNAL_SERVER_ERROR);
            });
        }
    }
});
function validateQueryParams(req) {
    const query = req.query;
    if (Object.keys(query).length === 0) {
        return false;
    }
    else {
        if (Object.prototype.hasOwnProperty.call(query, 'filename') &&
            Object.prototype.hasOwnProperty.call(query, 'width') &&
            Object.prototype.hasOwnProperty.call(query, 'height')) {
            // validate width and height
            const width = query.width;
            const height = query.height;
            if (!validateWidthAndHeight(width, height)) {
                return false;
            }
            if (!validateFileName(query.filename)) {
                return false;
            }
        }
        else {
            return false;
        }
    }
    return true;
    // throw new Error('Function not implemented.');
}
function validateWidthAndHeight(width, height) {
    // check if width and height are numbers
    if (isNaN(width) || isNaN(height)) {
        return false;
    }
    if (width <= 0 || height <= 0) {
        return false;
    }
    return true;
}
function validateFileName(filename) {
    // check if filename is valid
    if (filename === '') {
        return false;
    }
    return true;
}
exports.default = {
    routes,
    validateQueryParams,
    validateWidthAndHeight,
    validateFileName,
};
