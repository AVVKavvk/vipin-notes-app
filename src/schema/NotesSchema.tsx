export type NotesSchema = {
  _id?: string;
  subject_name?: string;
  studentEmail?: string;
  pdfUrl?: string;
  video_url?: string;
  createdAt?: string;
  updatedAt?: string;
  isVerified?: boolean;
};

export type NotesUploadSchema = {
  sem: string;
  email: string;
  pdfUrl: string;
  subject: string;
};
