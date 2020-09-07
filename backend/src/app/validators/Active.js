import { celebrate, Joi, Segments } from 'celebrate';

export const ActiveGet = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    refresh: Joi.boolean(),
  }),
});

export const ActivePost = celebrate({
  [Segments.BODY]: Joi.object().keys({
    code: Joi.string()
      .min(4)
      .max(6)
      .required(),
    amount: Joi.number().required(),
    value: Joi.number().required(),
    type: Joi.string()
      .valid('Stock', 'ETF', 'FII', 'REIT')
      .required(),
    buyDate: Joi.date().required(),
  }),
});
