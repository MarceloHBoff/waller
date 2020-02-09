import Router from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StockController from './app/controllers/StockController';
import BondController from './app/controllers/BondController';
import CeiImportController from './app/controllers/CeiImportController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/stocks', StockController.store);
routes.get('/stocks', StockController.index);

routes.post('/bonds', BondController.store);
routes.get('/bonds', BondController.index);

routes.post('/ceiimport', CeiImportController.store);

export default routes;
