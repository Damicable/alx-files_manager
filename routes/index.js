<<<<<<< HEAD
// eslint-disable-next-line no-unused-vars
import { Express } from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import FilesController from '../controllers/FilesController';
import { basicAuthenticate, xTokenAuthenticate } from '../middlewares/auth';
import { APIError, errorResponse } from '../middlewares/error';

/**
 * Injects routes with their handlers to the given Express application.
 * @param {Express} api
 */
const injectRoutes = (api) => {
  api.get('/status', AppController.getStatus);
  api.get('/stats', AppController.getStats);

  api.get('/connect', basicAuthenticate, AuthController.getConnect);
  api.get('/disconnect', xTokenAuthenticate, AuthController.getDisconnect);

  api.post('/users', UsersController.postNew);
  api.get('/users/me', xTokenAuthenticate, UsersController.getMe);

  api.post('/files', xTokenAuthenticate, FilesController.postUpload);
  api.get('/files/:id', xTokenAuthenticate, FilesController.getShow);
  api.get('/files', xTokenAuthenticate, FilesController.getIndex);
  api.put('/files/:id/publish', xTokenAuthenticate, FilesController.putPublish);
  api.put('/files/:id/unpublish', xTokenAuthenticate, FilesController.putUnpublish);
  api.get('/files/:id/data', FilesController.getFile);

  api.all('*', (req, res, next) => {
    errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
  });
  api.use(errorResponse);
};

export default injectRoutes;
=======
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const express = require('express');
// all endpoints of our API
const router = (app) => {
  const route = express.Router();
  app.use(express.json());
  app.use('/', route);

  route.get('/status', (request, response) => AppController.getStatus(request, response));
  route.get('/stats', (request, response) => AppController.getStats(request, response));
  route.post('/users', (request, response) => UsersController.postNew(request, response));
  route.get('/connect', (request, response) => AuthController.getConnect(request, response));
  route.get('/disconnect', (request, response) => AuthController.getDisconnect(request, response));
  route.get('/users/me', (request, response) => UsersController.getMe(request, response));
  route.post('/files', (request, response) => FilesController.postUpload(request, response));
  route.get('/files/:id', (request, response) => FilesController.getShow(request, response));
  route.get('/files', (request, response) => FilesController.getIndex(request, response));
  route.put('/files/:id/publish', (request, response) => FilesController.putPublish(request, response));
  route.put('/files/:id/unpublish', (request, response) => FilesController.putUnpublish(request, response));
  route.get('/files/:id/data', (request, response) => FilesController.getFile(request, response));
};

export default router;
>>>>>>> 7fb699fd7307102a784a047e4c2a11f25b98c378
