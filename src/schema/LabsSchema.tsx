export type LabsSchema = {
  _id: string;
  studentEmail?: string;
  link?: string;
  subject?: string;
  createdAt?: string;
  updatedAt?: string;
  isVerified?: boolean;
};

export type LabsUploadSchema = {
  sem: string;
  email: string;
  link: string;
  subject: string;
};
