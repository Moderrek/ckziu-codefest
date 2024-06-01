import axios from "axios";

import { API_V1 } from "@/lib/api/api";

const API_URL_USER_UPDATE_BIO = `${API_V1}/user/update/bio`;

const UserUpdateBio = (token: string, bio: string) => {
  const url = API_URL_USER_UPDATE_BIO;
  const res = axios.post(url);
};

export { UserUpdateBio };
