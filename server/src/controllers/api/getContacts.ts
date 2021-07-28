import { Request, Response } from "express";
const { readFile } = require("../../utils/promisify");
import url from "url";
import api from "../../api";
import { listUserModel } from "../../@types/model/listUserModel";
import { userModel } from "../../@types/model/userModel";

//Получение контактов пользователя
export async function getContacts(req: Request, res: Response): Promise<any> {
  try {
    let users: listUserModel = (await api.get("/api/users")).data;

    //Получаем контакты пользователя
    const { id } = url.parse(req.url, true).query;

    let contactsUserByid: userModel | userModel[] | any = users.users.filter(
      (user: userModel) => user.id === id
    );

    //Асинхронщина, чтобы ждать загрузку хотя бы
    await new Promise<void>((res, rej) =>
      setTimeout(() => {
        res();
      }, 1000)
    );

    return res.json(contactsUserByid[0].contacts ?? []);
  } catch (error) {
    console.error(error);
    return res.status(400).end("Произошла ошибка. Сервер не отвечает.");
  }
}
