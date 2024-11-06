import { SuperHero } from '../db/modals/Hero.js';

export const create = async (newHero) => {
  try {
    const response = await SuperHero.create(newHero);
    console.log(1);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Detailed error:', error);
    throw new Error(`Error creating superhero: ${error.message}`);
  }
};

export const getById = async (id) => {
  try {
    const response = await SuperHero.findById(id);
    if (!response) {
      throw new Error('Superhero not found');
    }
    return response;
  } catch (error) {
    console.error('Detailed error:', error);
    throw new Error(`Error getting superhero by ID: ${error.message}`);
  }
};

export const deleteById = async (id) => {
  try {
    const response = await SuperHero.findByIdAndDelete(id);
    if (!response) {
      throw new Error('Superhero not found');
    }
    return response;
  } catch (error) {
    console.error('Detailed error:', error);
    throw new Error(`Error deleting superhero by ID: ${error.message}`);
  }
};

export const patchById = async (id, body) => {
  try {
    const response = await SuperHero.findByIdAndUpdate(id, body, { new: true });
    if (!response) {
      throw new Error('Superhero not found');
    }
    return response;
  } catch (error) {
    console.error('Detailed error:', error);
    throw new Error(`Error updating superhero by ID: ${error.message}`);
  }
};

export async function getAllHeroes({ page, perPage }) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  try {
    const heroesQuery = SuperHero.find();

    const totalHeroesCount = await SuperHero.countDocuments();

    const heroes = await heroesQuery.skip(skip).limit(perPage).exec();

    const totalPages = Math.ceil(totalHeroesCount / perPage);

    if (page > totalPages) {
      page = totalPages;
    } else if (page <= 0) {
      page = 1;
    }

    return {
      data: heroes,
      page,
      perPage,
      totalItems: totalHeroesCount,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    };
  } catch (error) {
    console.error(`Error getting heroes: ${error.message}`);
    throw new Error('Failed to retrieve heroes');
  }
}
