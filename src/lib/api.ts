export const API_URL = "http://25.50.65.38:8080";
import axios from "axios";


export async function authentication(email: string){
  try {
    const res = await axios.post(API_URL + "/auth", {email: email})
    console.log(res.data);
  }catch(error){
    console.log(error);
  }
}

export async function APIstatus(){
  let response = await axios.get(API_URL + "/status");
  console.log(response.data);
}