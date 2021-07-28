import { Request, Response } from "express";
import api from "../../api";
import { generateId } from "../../utils/generateId";
import { writeFile } from "../../utils/promisify";
import { userModel } from "../../@types/model/userModel";
import { listUserModel } from "../../@types/model/listUserModel";

//Зарегестрировать аккаунт
export async function postRegistrationUser(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const { last_name, first_name, password, email } = req.body;

    //Проверяем есть ли уже такой пользователь
    try {
      await api.get(`/api/users/email?password=${password}&email=${email}`);

      const data: listUserModel = (await api.get("/api/users")).data;
      const id = generateId()
      data.users.push({
        id,
        first_name,
        last_name,
        password,
        email,
        contacts: [],
      } as userModel);

      //Добавляем нового пользователя к себе в базу
      await writeFile(`${__dirname}/../../users.json`, JSON.stringify(data));

      console.log(`Пользователь ${first_name} ${last_name} успешно добавлен`);
      return res.status(200).json(id);
    } catch {
      return res
        .status(400)
        .json("Пользователь с указанной почтой уже зарегистрирован.");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json("Произошла ошибка. Сервер не отвечает.");
  }
}
