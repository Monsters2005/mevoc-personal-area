import * as yup from 'yup';

export default yup.object().shape({
  firstName: yup.string().required('Please enter your first name'),
  lastName: yup.string().required('Please enter your last name'),
  nativeLang: yup.string().required('Please select your native language'),
  learningLang: yup
    .string()
    .required('Please select the language you are learning'),
  location: yup
    .string()
    .required('Please select the country you are based in'),
  phoneNumber: yup.string().required('Please enter your phone number'),
});
