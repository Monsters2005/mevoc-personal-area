export type User = {
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  langLearning: string;
  langNative: string;
  location: string;
  settings: {
    notifications: Record<string, Record<string, boolean>>;
    safety: {
      twoFactAuth: Record<string, boolean>;
    };
  };
};
