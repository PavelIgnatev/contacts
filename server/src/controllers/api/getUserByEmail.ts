import { Request, Response } from "express";
import api from "../../api";
import url from "url";
import { userModel } from "../../@types/model/userModel";
import { listUserModel } from "../../@types/model/listUserModel";

//Существует ли пользователь с указанным email
export async function getUserByEmail(
  req: Request,
  res: Response
): Promise<any> {
  try {
    let users: listUserModel = (await api.get("/api/users")).data;

    const { email } = url.parse(req.url, true).query;

    let userByEmail: userModel | userModel[] = users.users.filter(
      (item: userModel) => item.email === email
    );

    if (userByEmail.length > 0) {
      console.log(`Пользователь с почтой ${email} уже зарегестрирован`);
      return res.status(400).json(userByEmail);
    } else {
      console.log(`Пользователь с почтой ${email} не существует`);

      return res.status(200).json("");
    }
  } catch (error) {
    console.error(error);

    return res.status(400).end("Произошла ошибка. Сервер не отвечает.");
  }
}
