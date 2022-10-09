import * as yup from 'yup';

export default yup.object().shape({
  listTitle: yup.string().required('Please enter a title for the list'),
});
