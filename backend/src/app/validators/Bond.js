import { celebrate, Joi, Segments } from 'celebrate';

export const BondPost = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    value: Joi.number().required(),
    dueDate: Joi.date().required(),
    nowValue: Joi.number().required(),
  }),
});

export const BondPut = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    value: Joi.number().required(),
    dueDate: Joi.date().required(),
    nowValue: Joi.number().required(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

export const BondDelete = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});
