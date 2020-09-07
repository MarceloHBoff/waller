import { celebrate, Joi, Segments } from 'celebrate';

export const FundamentalsGet = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    code: Joi.string()
      .min(4)
      .max(6)
      .required(),
  }),
});
