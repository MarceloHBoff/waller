import { celebrate, Joi, Segments } from 'celebrate';

export const DividenGet = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    code: Joi.string().required().min(5).max(6),
  }),
});

export const DividenPost = celebrate({
  [Segments.BODY]: Joi.object().keys({
    code: Joi.string().required().min(4).max(6),
    type: Joi.string().valid('Stock', 'FII').required(),
  }),
});
