import { Request, Response } from "express";
import api from "../../api";
import { writeFile } from "../../utils/promisify";
import { userModel } from "../../@types/model/userModel";
import { listUserModel } from "../../@types/model/listUserModel";

//Удаление контакта пользователя
export async function delContacts(req: Request, res: Response): Promise<any> {
  try {
    const { id, friend } = req.body;

    let users: listUserModel = (await api.get("/api/users")).data;

    users.users.map((item: userModel) => {
      if (item.id === id) {
        let newItem: userModel = item;
        if (newItem.contacts.indexOf(friend) !== -1) {
          newItem.contacts.splice(newItem.contacts.indexOf(friend), 1);
        }
        return newItem;
      }
      return item;
    });

    await writeFile(`${__dirname}/../../users.json`, JSON.stringify(users));

    console.log("Удаление контакта прошло успешно");

    return res.status(200).json("");
  } catch (error) {
    console.error(error);
    return res.status(400).json("Произошла ошибка. Сервер не отвечает.");
  }
}
