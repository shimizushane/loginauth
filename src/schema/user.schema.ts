import { object, string, ref } from 'joi';

export const createUserSchema = object({
  body: object({
    name: string().required(),
    password: string()
      .required()
      .min(6)
      .regex(/^[a-zA-Z0-9_.-]*$/),
    passwordConfirmation: ref('password'),
  }),
});
