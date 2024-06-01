import { isDev } from "@/lib/utils";

export const API_URL = isDev
  ? "http://127.0.0.1:8080"
  : "https://api.ckziucodefest.pl";

export const API_V1 = API_URL + "/v1";

export const API_V1_AUTH_EXIST = API_V1 + "/auth/exist";
export const API_V1_AUTH_REGISTER = API_V1 + "/auth/register";
export const API_V1_AUTH_OTP = API_V1 + "/auth/otp";
export const API_V1_AUTH_LOGIN = API_V1 + "/auth/login";
