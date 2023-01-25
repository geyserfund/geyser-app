import { validEmail } from './regex';

export const validateEmail = (email: string) => validEmail.test(email);
