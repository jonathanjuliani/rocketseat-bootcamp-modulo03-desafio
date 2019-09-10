import { Router } from 'express';

import multer from 'multer';
import multerConfig from './configs/multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MeetAppsController from './app/controllers/MeetAppsController';
import OrganizingController from './app/controllers/OrganizingController';
import SubscriptionController from './app/controllers/SubscriptionController';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// auth middleware
routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.post('/files', upload.single('file'), FileController.store);

routes.get('/meetapps', MeetAppsController.index);
routes.post('/meetapps', MeetAppsController.store);
routes.put('/meetapps/:id', MeetAppsController.update);
routes.delete('/meetapps/:id', MeetAppsController.delete);

routes.get('/organizing', OrganizingController.index);
routes.get('/subscriptions', SubscriptionController.index);

routes.post('/meetups/:meetappId/subscriptions', SubscriptionController.store);

export default routes;
