import * as yup from 'yup';

export default yup.object().shape({
  email: yup
    .string()
    .email('Invalid email')
    .required('Please enter your email adress'),
  password: yup.string().required('Please enter your password'),
});
