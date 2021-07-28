import { Request, Response } from "express";
import api from "../../api";
import { writeFile } from "../../utils/promisify";
import { listUserModel } from "../../@types/model/listUserModel";

//Добавить контакт для юзера
export async function postContacts(req: Request, res: Response): Promise<any> {
  try {
    const { id, friend } = req.body;

    let users: listUserModel = (await api.get("/api/users")).data;

    users.users.map((item: any) => {
      if (item.id === id && !item.contacts.includes(friend)) {
        let newItem = item;
        newItem.contacts.push(friend as string);
        return newItem;
      }
      return item;
    });
    
    await writeFile(`${__dirname}/../../users.json`, JSON.stringify(users));

    console.log("Новый контакт успешно добавлен");

    return res.status(200).json("");
  } catch (error) {
    console.error(error);
    return res.status(400).json("Произошла ошибка. Сервер не отвечает.");
  }
}
