import { List } from './List';

export type User = {
  id: number | undefined;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  learningLang: string;
  nativeLang: string;
  location: string;
  dob: Date;
  email: string;
  phoneNumber: string;
  confirmed_hash: string;
  confirmed: boolean;
  lists: List[];
  settings: {
    safety: {
      twoFactAuth: {
        textMessage: boolean;
        authApp: boolean;
      };
    };
  };
};
