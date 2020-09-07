import { celebrate, Joi, Segments } from 'celebrate';

export const UserDividend = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    type: Joi.string().valid('all', 'new').required(),
  }),
});
