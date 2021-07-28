import { Request, Response } from "express";
import api from "../../api";
import url from "url";
import { userModel } from "../../@types/model/userModel";
import { listUserModel } from "../../@types/model/listUserModel";

//Существует ли пользователь с указанной почтой или паролем
export async function getUserByEmailAndPassword(
  req: Request,
  res: Response
): Promise<any> {
  try {
    let users: listUserModel = (await api.get("/api/users")).data;

    const { password, email } = url.parse(req.url, true).query;

    let userByEmailAndPassword: userModel | userModel[] = users.users.filter(
      (item: userModel) => item.password === password && item.email === email
    );

    if (userByEmailAndPassword.length) {
      console.log(`Пользователь с почтой ${email} уже существует`);

      return res.status(200).json(userByEmailAndPassword[0]);
    } else {
      console.log(`Пользователь с почтой ${email} не существует`);

      return res.status(400).end("Пользователь не найден");
    }
  } catch (error) {
    console.error(error);

    return res.status(400).end("Произошла ошибка. Сервер не отвечает.");
  }
}
