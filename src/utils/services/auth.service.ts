import axios from "axios";
import {type SignInData} from "@/utils/types/global.types";

export const googleLogin = async (data): Promise<SignInData> => {
  const response = await axios.get(import.meta.env.VITE_BASE_URL_HTTP + "/auth/google/callback", {
    params: data
  });
  return response.data;
}

export const loadCurrentUser = async (accessToken: string) => {
  const response = await axios.get(import.meta.env.VITE_BASE_URL_HTTP + "/auth/user/current",{
    headers: accessToken?.length > 0 && {
      Authorization: 'Bearer ' + accessToken
    }
  }).catch(() => null);
  return response?.data?.user || null;
}
