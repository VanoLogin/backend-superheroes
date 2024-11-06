import { Router } from 'express';
import express from 'express';

//============Schema====//
import {
  createSuperHeroesSchema,
  updateSuperHeroSchema,
} from '../validation/validation.js';
//=============Middlewares================================//
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

//==============Utils================================//

import ctrlWrapper from '../utils/ctrlWrapper.js';

//=============Controller================================//

import {
  getSuperHeroesController,
  getsuperHeroByIdController,
  deletsuperHeroController,
  patchSuperHeroByIdController,
  createSuperHeroesController,
} from '../controllers/heroes.js';

//============Routers====================//

const superHeroesRouter = Router();
const jsonParser = express.json();

superHeroesRouter.get(
  '/superheroes',
  jsonParser,
  ctrlWrapper(getSuperHeroesController),
);

superHeroesRouter.get(
  '/superheroes/:id',
  isValidId,
  ctrlWrapper(getsuperHeroByIdController),
);

superHeroesRouter.post(
  '/superheroes',
  jsonParser,
  validateBody(createSuperHeroesSchema),
  ctrlWrapper(createSuperHeroesController),
);

superHeroesRouter.delete(
  '/superheroes/:id',
  isValidId,
  jsonParser,
  ctrlWrapper(deletsuperHeroController),
);

superHeroesRouter.patch(
  '/superheroes/:id',
  isValidId,
  jsonParser,
  validateBody(updateSuperHeroSchema),
  ctrlWrapper(patchSuperHeroByIdController),
);

export default superHeroesRouter;
