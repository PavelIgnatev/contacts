import api from '../../api'
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

type FormValues = {
  first_name: string;
  last_name: string;
  password: string;
  email: string
};

function RegistrationPage() {
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
    if (values.first_name.length < 2) {
      errors.first_name = {
        type: "required",
        message: 'Минимальная длина имени 2 символа'
      }
    }
    if (values.last_name.length < 2) {
      errors.last_name = {
        type: "required",
        message: 'Минимальная длина фамилии 2 символа'
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
      values: values.first_name || values.last_name || values.password || values.email ? values : {},
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
        const id = (await api.postRegistration('/api/users/registration', data)).data
        //Раздизейблим кнопку отправки
        changeDisabledBtn(false)
        localStorage.setItem('id', id)
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
    < >
      <h1>Зарегестрировать новый аккаунт</h1>
      <form style={{ marginTop: '50px' }} onSubmit={handleSubmit(onSubmit)}>
        <label>Ваше имя</label>
        <input {...register("first_name")} />
        {errors?.first_name?.message && <p>{errors.first_name.message}</p>}
        <label>Ваша фамилия</label>
        <input
          {...register("last_name")}
        />
        {errors?.last_name?.message && <p>{errors.last_name.message}</p>}
        <label>Ваша почта</label>
        <input
          type="email" {...register("email")}
        />
        {errors?.email?.message && <p>{errors.email.message}</p>}
        {postByError && <p>Произошла ошибка, скорее всего данная почта уже занята другим пользователем</p>}
        <label>Придумайте пароль</label>
        <input
          type="password" {...register("password")}
        />
        {errors?.password?.message && <p>{errors.password.message}</p>}
        <input type="submit" disabled={disabledBtn} />

        {redirect && <Redirect to='/contacts' />}
      </form>
      <Link className="pageLink" to='/login'>Войти в акаунт</Link>
    </>
  );
}

export default RegistrationPage
