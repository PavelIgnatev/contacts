import api from '../../api'
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

type FormValues = {
  password: string;
  email: string
};

function LoginPage() {
  const [postByError, changePostByError] = useState(false)
  const [disabledBtn, changeDisabledBtn] = useState(false)

  //Нужно для того, чтобы редирект происходил только тогда,
  //когда пользователь еще остается на странице
  const [redirect, changeRedirect] = useState(false)

  const resolver: Resolver<FormValues> = async (values) => {
    let errors: any = {
    }
    if (values.password.length < 6) {
      errors.password = {
        type: "required",
        message: 'Минимальная длина пароля 8 символов'
      }
    }
    if (values.email.length < 5) {
      errors.email = {
        type: "required",
        message: 'Минимальная длина почты 5 символов'
      }
    }
    changePostByError(false)

    return {
      values: values.password || values.email ? values : {},
      errors: errors
    };
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({ resolver });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.email.length >= 2 && data.password.length >= 6) {
      try {
        //Задизейблим кнопку отправки
        changeDisabledBtn(true)
        //Отправляем запрос на серв
        const id = (await api.postLogin('/api/users/login', data)).data
        //Раздизейблим кнопку отправки
        changeDisabledBtn(false)
        localStorage.setItem('id', id.id)
        changeRedirect(true)
      } catch {
        //Раздизейблим кнопку отправки
        changeDisabledBtn(false)
        //Кинем ошибку
        changePostByError(true)
      }
    }
  };

  return (
    <>
      <h1>Войти в аккаунт</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Ваша почта</label>
        <input
          type="email" {...register("email")}
        />
        {errors?.email?.message && <p>{errors.email.message}</p>}
        {postByError && <p>Произошла ошибка, аккаунта с указанными данными не существует, проверьте правильность и попробуйте ещё раз</p>}
        <label>Ваш пароль</label>
        <input
          type="password" {...register("password")}
        />
        {errors?.password?.message && <p>{errors.password.message}</p>}
        <input type="submit" disabled={disabledBtn} />

        {redirect && <Redirect to='/contacts' />}
      </form>
      <Link className="pageLink" to='/registration'>Зарегистрировать новый аккаунт</Link>
    </>
  );
}

export default LoginPage
