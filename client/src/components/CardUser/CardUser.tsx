import { cardUser } from "../../@types/cardUser";
import loader from "../../assets/loader/loader.svg";
import check from "../../assets/icons/check.svg";
import remove from "../../assets/icons/remove.svg";
import api from "../../api";
import "./CardUser.sass";
import { useState } from "react";

const CardUser = (props: cardUser) => {
  const [pending, updatePending] = useState(false);

  async function addFriend(friend: string): Promise<void> {
    const id = localStorage.getItem("id");
    try {
      updatePending(true);
      await api.postContacts("/api/contacts", { id: id, friend: friend });
      await updateContacts()
      updatePending(false);
    } catch (error) {
      updatePending(false);
    }
  }
  async function delFriend(friend: string): Promise<void> {
    const id = localStorage.getItem("id");
    try {
      updatePending(true);
      await api.delContacts("/api/contacts", { id: id, friend: friend });
      await updateContacts()
      updatePending(false);
    } catch (error) {
      updatePending(false);
    }
  }

  async function updateContacts() {
    return await props.changeContacts(
      (await api.get(`/api/contacts?id=${localStorage.getItem("id")}`))
        .data ?? []
    );
  }

  return (
    <div className="CardUser">
      <div className="CardUser__user">
        <div className="CardUser__name">{props.userInfo.first_name}</div>
        <div className="CardUser__sername">{props.userInfo.last_name}</div>
      </div>
      <div className="CardUser__email">{props.userInfo.email}</div>
      {!pending &&
        (props.contacts.indexOf(props.userInfo.id) !== -1 ? (
          <img
            className="CardUser__img"
            src={remove}
            alt=""
            title="Удалить контакт"
            onClick={async () => await delFriend(props.userInfo.id)}
          />
        ) : (
          <img
            className="CardUser__img"
            src={check}
            alt=""
            title="Добавить контакт"
            onClick={async () => await addFriend(props.userInfo.id)}
          />
        ))}
      {pending && (
        <img
          className="CardUser__img"
          style={{ height: "100px", right: "-33px" }}
          src={loader}
          alt=""
        />
      )}
    </div>
  );
};
export default CardUser;
