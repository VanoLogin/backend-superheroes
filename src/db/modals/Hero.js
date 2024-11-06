import mongoose, { model, Schema } from 'mongoose';

const SuperheroSchema = new Schema(
  {
    nickname: {
      type: String,
      required: true,
    },
    realName: {
      type: String,
      required: true,
    },
    originDescription: {
      type: String,
      required: true,
    },
    superpowers: {
      type: String,
      required: true,
    },
    superheroId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    image: {
      type: String,
    },
    catchPhrase: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const SuperHero = model('superheroes', SuperheroSchema);
