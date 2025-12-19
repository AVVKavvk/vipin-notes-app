import { RateSchemaGet, RateSchemaPost } from "@/src/schema/RateSchema";
import axiosClient from "@/src/utils/axiosClient";
import { create } from "zustand";

interface RateStore {
  postRateToBackend: (body: RateSchemaPost) => Promise<any | null>;
  getRateDataFromBackend: () => Promise<RateSchemaGet[] | null>;
}
export const useRateStore = create<RateStore>((set, get) => ({
  postRateToBackend: async (body: RateSchemaPost) => {
    try {
      const url = `/rating`;
      // console.log(body);
      const res = await axiosClient.post(url, body);
      const data = res.data;
      // console.log(data);
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
  getRateDataFromBackend: async () => {
    try {
      const url = `/rating`;
      //   console.log(url);
      const res = await axiosClient.get(url);
      const data = res.data;
      //   console.log(data);
      if (data.status === "ok") {
        const rateData: RateSchemaGet[] = data.result ?? [];
        return rateData;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
}));
