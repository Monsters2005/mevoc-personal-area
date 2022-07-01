import * as yup from 'yup';

export default yup.object().shape({
  newPassword: yup
    .string()
    .typeError('Has to be a string')
    .required('Please enter a new password')
    .min(9, 'Your password should be at least 9 characters long'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords do not match')
    .required('Please repeat a new password'),
});
