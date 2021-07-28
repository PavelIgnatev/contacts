import { Request, Response } from "express";
import { listUserModel } from "../../@types/model/listUserModel";
const { readFile } = require("../../utils/promisify");

//Получение списка пользователей
export async function getUsers(req: Request, res: Response): Promise<any> {
  try {
    //Получаем пользователей
    let users: string = await readFile(`${__dirname}/../../users.json`);

    let parseUsers: listUserModel = JSON.parse(users);

    return res.json(parseUsers);
  } catch (error) {
    console.error(error);
    return res.status(400).end("Произошла ошибка. Сервер не отвечает.");
  }
}
