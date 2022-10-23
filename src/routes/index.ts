import express from 'express';
import ImagesApi from './api/images';
import Constants from '../utils/constants';

const routes = express.Router();
routes.use(Constants.IMAGES, ImagesApi.routes);

export default routes;
