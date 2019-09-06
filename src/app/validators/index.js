import * as Yup from 'yup';

const defaultFields = {
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .required()
    .min(6),
};

const validateUserStore = async data => {
  const { name, email, password } = defaultFields;
  const schema = Yup.object().shape({ name, email, password });

  const isValid = await schema.isValid(data);
  return isValid;
};

const validateUserUpdate = async data => {
  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    oldPassword: Yup.string().min(6),
    password: Yup.string()
      .min(6)
      .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password ? field.required().oneOf([Yup.ref('password')]) : field
    ),
  });

  const isValid = await schema.isValid(data);
  return isValid;
};

export default {
  validateUserStore,
  validateUserUpdate,
};
