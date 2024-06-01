"use server";
import { cookies } from "next/headers";

const getToken = async () => {
  "use server";
  return cookies().get("token")?.value;
};

export { getToken };
