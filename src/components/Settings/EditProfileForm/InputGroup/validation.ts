import * as yup from 'yup';

export default yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .max(30, "Shouldn't be more than 30 characters long"),
  lastName: yup
    .string()
    .required('Last name is required')
    .max(30, "Shouldn't be more than 30 characters long"),
  username: yup
    .string()
    .required('Username is required')
    .max(20, "Shouldn't be more than 20 characters long")
    .min(3, "Shouldn't be less than 3 characters long"),
  dob: yup.string().required('Date of birth is required'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Email adress is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  location: yup.string().required('Location is required'),
  nativeLang: yup.string().required('Native language is required'),
  learningLang: yup.string().required('Learning language is required'),
});
