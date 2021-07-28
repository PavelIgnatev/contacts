import { getUsers } from "./getUsers";
import { getUserByEmail } from "./getUserByEmail";
import { getUserByEmailAndPassword } from "./getUserByEmailAndPassword";
import { postRegistrationUser } from "./postRegistrationUser";
import { postLoginUser } from "./postLoginUser";
import { getContacts } from "./getContacts";
import { postContacts } from "./postContacts";
import { delContacts } from "./delContacts";
import { getUserById } from "./getUserById";

const api = {
  getUsers,
  getUserByEmail,
  getUserByEmailAndPassword,
  postRegistrationUser,
  postLoginUser,
  getContacts,
  getUserById,
  postContacts,
  delContacts,
};
export { api };
