export type SignInDto = Readonly<{
  email: string;
  password: string;
  token?: string;
}>;
