import axios from "axios";
import { AxiosResponse } from "axios";
import { registrationModel } from "../@types/registrationModel";
import { loginModel } from "../@types/loginModel";
import { postContactsModel } from "../@types/postContactsModel";
import { userModel } from "../@types/userModel";

const path: string = "http://localhost:3000";

class Api {
  async get(url: string, params?: any): Promise<AxiosResponse<any>> {
    let fullUrl: string = path + url;
    if (params) {
      fullUrl +=
        "?" + new URLSearchParams(params).toString().replace("%40", "@");
    }
    return await axios(fullUrl);
  }

  async postRegistration(
    url: string,
    data: registrationModel
  ): Promise<AxiosResponse<string>> {
    let formData: registrationModel = {
      last_name: data.last_name,
      first_name: data.first_name,
      password: data.password,
      email: data.email,
    };

    return await axios.post(url, formData);
  }

  async postLogin(
    url: string,
    data: loginModel
  ): Promise<AxiosResponse<userModel>> {
    let formData: loginModel = {
      password: data.password,
      email: data.email,
    };

    return await axios.post(url, formData);
  }

  async postContacts(
    url: string,
    data: postContactsModel
  ): Promise<AxiosResponse<string>> {
    let formData: postContactsModel = {
      id: data.id,
      friend: data.friend,
    };

    return await axios.post(url, formData);
  }

  async delContacts(
    url: string,
    data: postContactsModel
  ): Promise<AxiosResponse<string>> {
    let formData: postContactsModel = {
      id: data.id,
      friend: data.friend,
    };

    return await axios.delete(url, { data: formData });
  }
}

export default new Api();
