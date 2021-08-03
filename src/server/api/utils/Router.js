import express from 'express';

export default function Router(controller, attachRoutes) {
  const router = express.Router();
  if (attachRoutes) {
    attachRoutes(router);
  }
  router.post('/', controller.create);
  router.get('/', controller.getAll);
  router.put('/:id', controller.updateById);
  router.get('/:id', controller.getById);
  return router;
}

export const expressRouter = new express.Router();

export const app = express();
