import Joi from 'joi';

const createSuperHeroesSchema = Joi.object({
  nickname: Joi.string().min(3).max(20).required().messages({
    'string.base': 'nickname must be a string',
    'string.max': 'Max letters must be 20',
    'string.min': 'Min letters must be 3',
    'any.required': 'nickname is required',
  }),
  realName: Joi.string().min(3).max(20).required().messages({
    'string.base': 'realName must be a string',
    'string.max': 'Max letters must be 20',
    'string.min': 'Min letters must be 3',
    'any.required': 'realName is required',
  }),
  originDescription: Joi.string().min(3).max(100).required().messages({
    'string.base': 'originDescription must be a string',
    'string.max': 'Max letters must be 100',
    'string.min': 'Min letters must be 3',
    'any.required': 'originDescription is required',
  }),
  image: Joi.string().allow('').default(''),
  catchPhrase: Joi.string().min(3).max(50).required(),
  superpowers: Joi.string().min(3).max(20).required(),
});

const updateSuperHeroSchema = Joi.object({
  nickname: Joi.string().min(3).max(20),
  realName: Joi.string().min(3).max(20),
  originDescription: Joi.string().min(3).max(100),
  catchPhrase: Joi.string(),
  superpowers: Joi.string(),
  image: Joi.string().allow('').default(''),
});

export { createSuperHeroesSchema, updateSuperHeroSchema };
