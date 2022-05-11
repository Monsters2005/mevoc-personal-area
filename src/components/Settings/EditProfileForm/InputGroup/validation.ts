import * as yup from 'yup';

export default yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  username: yup.string().required('Username is required'),
  dob: yup.string().required('Date of birth is required'),
  email: yup
    .string()
    .email('Invalid email')
    .required('Email adress is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  location: yup.string().required('Location is required'),
  // nativeLang: yup.string().required('Native language is required'),
  // learnignLang: yup.string().required('Learning language is required'),
});
