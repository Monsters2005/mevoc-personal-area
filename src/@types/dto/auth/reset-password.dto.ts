export type ResetPasswordDto = Readonly<{
  newPassword: string;
  confirmPassword: string;
}>;
