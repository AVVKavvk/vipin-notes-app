import { LabsSchema, LabsUploadSchema } from "@/src/schema/LabsSchema";
import axiosClient from "@/src/utils/axiosClient";
import { create } from "zustand";

interface LabsStore {
  getLabsBySemester: (semLinkName: string) => Promise<LabsSchema[] | null>;
  uploadLabsBySemester: (labData: LabsUploadSchema) => Promise<any | null>;
}
export const useLabsStore = create<LabsStore>((set, get) => ({
  getLabsBySemester: async (semLinkName: string) => {
    try {
      const url = `/${semLinkName}/get/lab`;
      //   console.log(url);
      const res = await axiosClient.post(url);
      const data = res.data;
      //   console.log(data);
      if (data.status === "ok") {
        const labsData: LabsSchema[] = data.result ?? [];
        return labsData;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  uploadLabsBySemester: async (labData: LabsUploadSchema) => {
    try {
      const url = `sem${labData.sem}/update/lab`;
      const body = {
        studentEmail: labData.email,
        subject: labData.subject,
        link: labData.link,
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
