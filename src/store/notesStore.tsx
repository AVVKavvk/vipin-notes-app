import { NotesSchema, NotesUploadSchema } from "@/src/schema/NotesSchema";
import axiosClient from "@/src/utils/axiosClient";
import { create } from "zustand";

interface NotesStore {
  getNotesBySemester: (semLinkName: string) => Promise<NotesSchema[] | null>;
  uploadNotesBySemester: (noteData: NotesUploadSchema) => Promise<any | null>;
}
export const useNotesStore = create<NotesStore>((set, get) => ({
  getNotesBySemester: async (semLinkName: string) => {
    try {
      const url = `/${semLinkName}/get/notes`;
      //   console.log(url);
      const res = await axiosClient.post(url);
      const data = res.data;
      // console.log(data);
      if (data.status === "ok") {
        const notesData: NotesSchema[] = data.result ?? [];
        return notesData;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  uploadNotesBySemester: async (noteData: NotesUploadSchema) => {
    try {
      const url = `sem${noteData.sem}/update/notes`;
      const body = {
        studentEmail: noteData.email,
        subject_name: noteData.subject,
        pdfUrl: noteData.pdfUrl,
      };

      const res = await axiosClient.post(url, body);
      const data = res.data;

      if (data.status === "ok") {
        const response = data.result ?? {};
        return response;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
}));
