import { NotesSchema } from "@/src/schema/NotesSchema";
import axiosClient from "@/src/utils/axiosClient";
import { create } from "zustand";

interface NotesStore {
  getNotesBySemester: (semLinkName: string) => Promise<NotesSchema[] | null>;
}
export const useNotesStore = create<NotesStore>((set, get) => ({
  getNotesBySemester: async (semLinkName: string) => {
    try {
      const url = `/${semLinkName}/get/notes`;
      //   console.log(url);
      const res = await axiosClient.post(url);
      const data = res.data;
      console.log(data);
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
}));
