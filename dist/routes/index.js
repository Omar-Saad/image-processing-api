"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./api/images"));
const constants_1 = __importDefault(require("../utils/constants"));
const routes = express_1.default.Router();
routes.use(constants_1.default.IMAGES, images_1.default.routes);
exports.default = routes;
