"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const req = (0, supertest_1.default)(index_1.default);
describe('Test Endpoints', () => {
    it('should return 400 if no query params are provided', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/api/images');
        expect(res.status).toBe(400);
    }));
    it('should return 400 if query params are not valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/api/images?width=-200&height=100&filename=');
        expect(res.status).toBe(400);
    }));
    it('should return 200 if query params are valid', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield req.get('/api/images?width=200&height=100&filename=test.png');
        expect(res.status).toBe(200);
    }));
});
