export const API_URL = 'http://25.50.65.38:8080';
import axios from 'axios';

export async function authentication(email: string) {
  try {
    const res = await axios.post(API_URL + '/auth', { email: email });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
