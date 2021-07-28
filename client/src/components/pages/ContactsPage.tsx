import { useEffect, useState } from "react";
import api from "../../api";
import { userModel } from "../../@types/userModel";
import CardUser from "../CardUser/CardUser";
import loader from "../../assets/loader/loader.svg";

const ContactsPage = () => {
  let [contacts, changeContacts] = useState([]);
  let [users, changeUsers] = useState([]);
  let [search, changeSearch] = useState("");


  //Подготовка данных для отрисовки с возможностью поиска в realtime
  const dashboard = users
    .filter((ticker: userModel) => {
      return String(
        ticker.last_name?.toUpperCase() +
          ticker.first_name?.toUpperCase() +
          ticker.email?.toUpperCase()
      ).includes(search.toUpperCase());
    })
    .map((userInfo: userModel) =>
      userInfo.id !== localStorage.getItem("id") ? (
        <CardUser
          userInfo={userInfo}
          key={userInfo.id}
          contacts={contacts}
          changeContacts={changeContacts}
        />
      ) : (
        ""
      )
    );

  //После загрузки страницы делаем запросы на получение контактов и всех юзеров
  useEffect(() => {
    (async () => {
      changeContacts(
        (await api.get(`/api/contacts?id=${localStorage.getItem("id")}`))
          .data ?? []
      );
      changeUsers((await api.get(`/api/users`)).data.users ?? []);
    })();
  }, []);

  return (
    <section className="ContactsPage">
      <h1>Все контакты</h1>
      <input
        type="text"
        style={{ marginBottom: "35px" }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          changeSearch(e.currentTarget.value);
        }}
        placeholder="Поиск..."
      />
      {!users.length && <img className="loader" src={loader} alt="" />}
      <div className="CardUser__wrapper">{dashboard}</div>
    </section>
  );
};
export default ContactsPage;
