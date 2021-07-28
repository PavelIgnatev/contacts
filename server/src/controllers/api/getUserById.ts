import { Request, Response } from "express";
import api from "../../api";
import url from "url";
import { userModel } from "../../@types/model/userModel";
import { listUserModel } from "../../@types/model/listUserModel";

//Существует ли пользователь с указанным id
export async function getUserById(req: Request, res: Response): Promise<any> {
  try {
    let users: listUserModel = (await api.get("/api/users")).data;

    const { id } = url.parse(req.url, true).query;

    let userById: userModel | userModel[] = users.users.filter(
      (item: userModel) => item.id === id
    );

    if (userById.length > 0) {
      console.log(`Пользователь ${id} вошел в свой аккаунт`);
      return res.status(200).json(userById);
    } else {
      console.log(
        `Не удалось получить данные о входе в аккаунт для пользователя ${id}`
      );

      return res
        .status(400)
        .json(
          "Не удалось повторно получить данные о входе в аккаунт, попробуйте войти снова"
        );
    }
  } catch (error) {
    console.error(error);

    return res.status(400).end("Произошла ошибка. Сервер не отвечает.");
  }
}
