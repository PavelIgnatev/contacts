import axios from "axios";
import { AxiosResponse } from "axios";

const path: string = "http://localhost:3000";

class Api {
  async get(url: string, params?: any): Promise<AxiosResponse<any>> {
    let fullUrl: string = path + url;
    if (params) {
      fullUrl += "?" + new URLSearchParams(params).toString();
    }
    return await axios(fullUrl);
  }
}
export default new Api();
