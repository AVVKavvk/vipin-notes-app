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
  getUserProfile: (email: string) => Promise<UserLoginResponseSchema | null>;
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

        // Destructure 'user' and 'token' separately from the response
        const { token, user } = data.result;

        // Merge them if you want a flat object matching your Schema
        // or access them directly.
        const userData = { ...user, token };

        console.log("Fixed User Data:", userData);

        if (userData && userData._id) {
          // Now these keys exist
          await setItem(ACCESS_TOKEN, token);
          await setItem(User_ID, userData._id);
          await setItem(User_Email, userData.email);
          await setItem(User_Image, userData.image ?? "");
        }

        // Update count after successful login
        await get().getUserCount();
      }
      console.log(res.data);
    } catch (error) {
      console.log("Login Error:", error);
      throw error;
    }
  },

  getUserCount: async () => {
    try {
      const url = `/auth/count`;
      const res = await axiosClient.get(url);
      const data = res.data;

      if (data.status === "ok") {
        const countValue = data.result ?? 1305;

        set({ userCount: countValue });

        // Convert number to string for AsyncStorage
        await setItem(Count_User, countValue.toString());
      }
      console.log("User Count Data:", res.data);
    } catch (error) {
      console.log("Count Error:", error);
      throw error;
    }
  },
  getUserProfile: async (email: string) => {
    try {
      const url = `/auth/user`;

      const res = await axiosClient.post(url, { email });
      const data = res.data;
      console.log(data);

      if (data.status === "ok") {
        const userData: UserLoginResponseSchema = data.result.user ?? {};
        return userData;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
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
