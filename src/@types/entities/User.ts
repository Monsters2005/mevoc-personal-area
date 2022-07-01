export type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  langLearning: string;
  langNative: string;
  location: string;
  dob: Date;
  emailAdress: string;
  phoneNumber: string;
  confirmed_hash: string;
  confirmed: boolean;
  settings: {
    safety: {
      twoFactAuth: {
        textMessage: boolean;
        authApp: boolean;
      };
    };
  };
};