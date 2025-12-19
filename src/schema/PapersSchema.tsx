export type PapersSchema = {
  _id: string;
  studentEmail?: string;
  T1?: string; // link of pdf
  T2?: string; // link of pdf
  T3?: string; // link of pdf
  createdAt?: string;
  updatedAt?: string;
  isVerified?: boolean;
};

export type PapersUploadSchema = {
  sem: string;
  email: string;
  linkT1?: string;
  linkT2?: string;
  linkT3?: string;
};
