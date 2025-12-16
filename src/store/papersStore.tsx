import { PapersSchema } from "@/src/schema/PapersSchema";
import axiosClient from "@/src/utils/axiosClient";
import { create } from "zustand";

interface PaperStore {
  getPapersBySemester: (semLinkName: string) => Promise<PapersSchema[] | null>;
}
export const usePaperStore = create<PaperStore>((set, get) => ({
  getPapersBySemester: async (semLinkName: string) => {
    try {
      const url = `/${semLinkName}/get/paper`;
      //   console.log(url);
      const res = await axiosClient.post(url);
      const data = res.data;
      //   console.log(data);
      if (data.status === "ok") {
        const papersData: PapersSchema[] = data.result ?? [];
        return papersData;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
}));
