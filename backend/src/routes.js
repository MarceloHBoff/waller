import Router from 'express';

import ActiveController from './app/controllers/ActiveController';
import BondController from './app/controllers/BondController';
import CEIController from './app/controllers/CEIController';
import DividendController from './app/controllers/DividendController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import UserDividendsController from './app/controllers/UserDividendsController';

import { ActiveGet, ActivePost } from './app/validators/Active';
import { BondPost, BondPut, BondDelete } from './app/validators/Bond';
import { CEIPost } from './app/validators/CEI';
import { DividenGet, DividenPost } from './app/validators/Dividend';
import { SessionPost } from './app/validators/Session';
import { UserPost } from './app/validators/User';
import { UserDividend } from './app/validators/UserDividend';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserPost, UserController.store);

routes.post('/sessions', SessionPost, SessionController.store);

routes.use(authMiddleware);

routes.get('/actives', ActiveGet, ActiveController.index);
routes.post('/actives', ActivePost, ActiveController.store);

routes.get('/actives/bonds', BondController.index);
routes.post('/actives/bonds', BondPost, BondController.store);
routes.put('/actives/bonds/:id', BondPut, BondController.update);
routes.delete('/actives/bonds/:id', BondDelete, BondController.delete);

routes.get('/dividend', DividenGet, DividendController.index);
routes.post('/dividend', DividenPost, DividendController.store);
routes.patch('/dividend', DividendController.create);

routes.get('/dividends', UserDividendsController.index);
routes.get('/dividends/:type', UserDividend, UserDividendsController.show);

routes.post('/ceiimport', CEIPost, CEIController.store);

export default routes;
