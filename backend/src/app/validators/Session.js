import { celebrate, Joi, Segments } from 'celebrate';

export const SessionPost = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required()
      .min(6),
  }),
});
