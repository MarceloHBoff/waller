import { celebrate, Joi, Segments } from 'celebrate';

export const CEIPost = celebrate({
  [Segments.BODY]: Joi.object().keys({
    cpf: Joi.string().required(),
    password: Joi.string().required(),
  }),
});
