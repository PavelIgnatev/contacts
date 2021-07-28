import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { Router } from "express";
import { api } from "./controllers/api";
import path from "path";

const apiRouter: Router = Router();

//Ручка для получения всех пользователей
apiRouter.get("/users", api.getUsers);

//Ручка для получения данных пользователя по id
apiRouter.get("/users/id", api.getUserById);

//Ручка для отправки данных на регистрацию
apiRouter.post("/users/registration", api.postRegistrationUser);

//Ручка для отправки данных на вход
apiRouter.post("/users/login", api.postLoginUser);

//Ручка для проверки существует ли такой email
apiRouter.get("/users/email", api.getUserByEmail);

//Ручка для проверки валидны ли email и password
apiRouter.get("/users/emailandpassword", api.getUserByEmailAndPassword);

//Ручка для получения всех контактов пользователя
apiRouter.get("/contacts", api.getContacts);

//Ручка для добавления нового контакта пользователя
apiRouter.post("/contacts", api.postContacts);

//Ручка для удаления контакта пользователя
apiRouter.delete("/contacts", api.delContacts);

const mainRouter: Router = Router();

//Раздаем статику реакта в production, иначе developer сборка
if (process.env.NODE_ENV === "production") {
  mainRouter.use(express.static(path.join(__dirname, "../../client", "build")));
  mainRouter.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client", "build", "index.html"));
  });
} else {
  mainRouter.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
    })
  );
}

export { mainRouter, apiRouter };
