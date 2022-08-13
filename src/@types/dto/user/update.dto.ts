import { UserSettings } from '../../entities/UserSettings';

export type UpdateUserDto = {
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  langLearning: string;
  langNative: string;
  location: string;
  settings: UserSettings;
};
