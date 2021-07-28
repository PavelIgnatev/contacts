import { Request, Response } from "express";
import api from "../../api";
import { generateId } from "../../utils/generateId";
import { writeFile } from "../../utils/promisify";
import { userModel } from "../../@types/model/userModel";

//Войти в аккаунт
export async function postLoginUser(req: Request, res: Response): Promise<any> {
  const { password, email } = req.body;

  //Проверяем есть ли уже такой пользователь
  try {
    let users: userModel = (
      await api.get(
        `/api/users/emailandpassword/?password=${password}&email=${email}`
      )
    ).data;

    return res.status(200).json(users);
  } catch {
    return res
      .status(400)
      .json(
        "Пользователя с указанной почтой не существует. Проверьте правильность введенных данных."
      );
  }
}
