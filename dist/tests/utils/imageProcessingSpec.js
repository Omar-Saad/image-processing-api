"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageProcessing_1 = __importDefault(require("../../utils/imageProcessing"));
// validate image proccesing utils
describe('Resize image', () => {
    it('should resize image', () => {
        const width = 100;
        const height = 100;
        const imagePath = './src/assets/images/test.png';
        imageProcessing_1.default.resizeImage(width, height, imagePath)
            .then((data) => {
            // check if image is resized
            expect(data).toBeInstanceOf(Buffer);
        });
    });
});
