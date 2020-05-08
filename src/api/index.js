import carOwnersRouter from './car_owners';
import express from 'express';

const apiRouter = express.Router();

apiRouter.use(carOwnersRouter);

console.log('successfully parsed /api/index.js')

export default apiRouter;