import { RateSchema } from "@/src/schema/RateSchema";
import axiosClient from "@/src/utils/axiosClient";
import { create } from "zustand";

interface RateStore {
  postRateToBackend: (body: RateSchema) => Promise<any | null>;
  getRateDataFromBackend: () => Promise<RateSchema[] | null>;
}
export const useRateStore = create<RateStore>((set, get) => ({
  postRateToBackend: async (body: RateSchema) => {
    try {
      const url = `/rating`;
      //   console.log(url);
      const res = await axiosClient.post(url, body);
      const data = res.data;
      //   console.log(data);
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
        const rateData: RateSchema[] = data.result ?? [];
        return rateData;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
}));
