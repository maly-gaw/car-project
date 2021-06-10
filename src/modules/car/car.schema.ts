import myzod, { Infer } from 'myzod';
import validator from 'validator';

export const paramIdSchema = myzod.object({
  id: myzod.string().withPredicate(validator.isUUID, 'expected id to be uuid')
});

export const createCarSchema = myzod.object({
  name: myzod.string(),
  type: myzod.string(),
  colour: myzod.string(),
  engine: myzod.string(),
  hp: myzod.number(),
});

export const updateCarSchema = myzod.object({
  hp: myzod.number(),
});

export type paramIdDTO = Infer<typeof paramIdSchema>;
export type createCarDTO = Infer<typeof createCarSchema>;
export type updateCarDTO = Infer<typeof updateCarSchema>;
