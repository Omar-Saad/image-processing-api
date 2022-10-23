"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import images api
const images_js_1 = __importDefault(require("../../../routes/api/images.js"));
// test all functions in api/images.ts
describe('Validate given parameters', () => {
    it('should validate filename', () => {
        const filename = 'test.png';
        expect(images_js_1.default.validateFileName(filename)).toBe(true);
    });
    it('should validate width and height', () => {
        const width = 100;
        const height = -100;
        expect(images_js_1.default.validateWidthAndHeight(width, height)).toBe(false);
    });
});
