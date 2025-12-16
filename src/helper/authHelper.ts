import { ACCESS_TOKEN } from "../constant/storage";
import { getItem } from "../utils/storage";

export const isLoggedIn = async () => {
  const token = await getItem(ACCESS_TOKEN);
  return token ? true : false;
};
