import { PapersSchema, PapersUploadSchema } from "@/src/schema/PapersSchema";
import axiosClient from "@/src/utils/axiosClient";
import { create } from "zustand";

interface PaperStore {
  getPapersBySemester: (semLinkName: string) => Promise<PapersSchema[] | null>;
  uploadPapersBySemester: (
    paperData: PapersUploadSchema
  ) => Promise<any | null>;
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
  uploadPapersBySemester: async (paperData: PapersUploadSchema) => {
    try {
      const url = `sem${paperData.sem}/update/paper`;
      const body = {
        studentEmail: paperData.email,
        T1: paperData?.linkT1,
        T2: paperData?.linkT2,
        T3: paperData?.linkT3,
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
