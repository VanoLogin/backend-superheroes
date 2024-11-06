import createHttpError from 'http-errors';

//===============Service================================//
import {
  create,
  getById,
  deleteById,
  patchById,
  getAllHeroes,
} from '../services/heroes.js';

//==========Utils================================//
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

//==============getSuperHeroesController============//

export const createSuperHeroesController = async (req, res, next) => {
  try {
    const newSuperHero = await create(req.body);
    res.status(201).json({
      status: 201,
      message: 'Superhero created successfully',
      data: newSuperHero,
    });
  } catch (error) {
    next(createHttpError(400, error.message));
  }
};

export const getsuperHeroByIdController = async (req, res, next) => {
  const id = req.params.id;
  try {
    const superHero = await getById(id);
    if (!superHero) {
      return next(createHttpError(404, 'Superhero not found'));
    }
    res.status(200).json({
      status: 200,
      message: 'Superhero retrieved successfully',
      data: superHero,
    });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

export const deletsuperHeroController = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deletedHero = await deleteById(id);
    if (!deletedHero) {
      return next(createHttpError(404, 'Superhero not found'));
    }
    res
      .status(200)
      .json({
        status: 204,
        message: 'Superhero deleted successfully',
        data: [],
      })
      .end();
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

export const patchSuperHeroByIdController = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedHero = await patchById(id, req.body);
    if (!updatedHero) {
      return next(createHttpError(404, 'Superhero not found'));
    }
    res.status(200).json({
      status: 200,
      message: 'Superhero updated successfully',
      data: updatedHero,
    });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

export const getSuperHeroesController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  try {
    const superHeroes = await getAllHeroes({ page, perPage });
    if (!superHeroes.data || !superHeroes.data.length) {
      res.status(404).json({
        status: 404,
        message: 'superHeroes not found',
        data: [],
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found superHeroes!',
      data: superHeroes,
    });
  } catch (error) {
    next(createHttpError(error));
  }
};
