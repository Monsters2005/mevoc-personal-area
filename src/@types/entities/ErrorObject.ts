export type CustomError = {
  status: number;
  data: {
    message: string;
    statusCode: number;
  };
};
