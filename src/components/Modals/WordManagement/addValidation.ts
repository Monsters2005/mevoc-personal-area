import * as yup from 'yup';

export default yup.object().shape({
  wordNative: yup
    .string()
    .required('Please enter a word in your native language'),
  wordLearning: yup
    .string()
    .required('Please enter a word in the language you are learning'),
});
