import { create } from "zustand";
import {
  ACCESS_TOKEN,
  Count_User,
  User_Email,
  User_ID,
  User_Image,
} from "../constant/storage";
import { UserLoginResponseSchema, UserLoginSchema } from "../schema/AuthSchema";
import axiosClient from "../utils/axiosClient";
import { removeItem, setItem } from "../utils/storage";

interface AuthStore {
  login: boolean;
  userCount: number;
  userLogin: (loginDetails: UserLoginSchema) => Promise<void>;
  getUserCount: () => Promise<void>;
  userLogout: () => void;
}
export const useAuthStore = create<AuthStore>((set, get) => ({
  login: false,
  userCount: 1305,
  userLogin: async (loginDetails: UserLoginSchema) => {
    try {
      const url = `/auth/login`;
      const body = {
        email: loginDetails.email,
        password: loginDetails.password,
      };
      const res = await axiosClient.post(url, body);
      const data = res.data;
      if (data.status === "ok") {
        set({ login: true });
        const userData: UserLoginResponseSchema = data.result ?? {};
        if (Object.keys(userData).length > 0) {
          await setItem(ACCESS_TOKEN, userData.token);
          await setItem(User_ID, userData?._id);
          await setItem(User_Email, userData?.email);
          await setItem(User_Image, userData?.image ?? "");
        }
        await get().getUserCount();
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getUserCount: async () => {
    try {
      const url = `/auth/count`;
      const res = await axiosClient.get(url);
      const data = res.data;
      if (data.status === "ok") {
        set({ userCount: data.count ?? 1305 });
        await setItem(Count_User, data.count ?? 1305);
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  userLogout: () => {
    try {
      set({ login: false });
      removeItem(ACCESS_TOKEN);
      removeItem(User_ID);
      removeItem(User_Email);
      removeItem(User_Image);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));
