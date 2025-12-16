export type UserLoginSchema = {
  email: string;
  password: string;
};

export type UserLoginResponseSchema = {
  token: string;
  _id: string;
  course?: string;
  createdAt?: string;
  updatedAt?: string;
  email: string;
  image?: string;
  name?: string;
  isAdmin?: boolean;
  others?: [string] | null;
  phNumber?: string;
  sem?: string;
};
