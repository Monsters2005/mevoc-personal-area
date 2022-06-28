export type ChangePasswordDto = Readonly<{
  current_password: string;
  password: string;
  confirm_password: string;
}>;
