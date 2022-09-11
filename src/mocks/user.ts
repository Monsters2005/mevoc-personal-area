import moment from 'moment';
import { User } from '../@types/entities/User';
import { lists } from './lists';

export const user: User = {
  firstName: 'Karina',
  lastName: 'Carmichael',
  username: 'perfechate',
  avatar: 'fHrx3Yx/photo-1.jpg',
  langLearning: 'English',
  langNative: 'German',
  location: 'somewhere',
  dob: new Date(),
  emailAdress: 'perfechate@gmail.com',
  phoneNumber: '+4247725802',
  confirmed_hash: '',
  confirmed: true,
  lists,
  id: 0,
  settings: {
    safety: {
      twoFactAuth: {
        textMessage: false,
        authApp: false,
      },
    },
  },
};
