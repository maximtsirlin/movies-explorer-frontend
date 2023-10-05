import React, { useState } from "react";
import "./Login.css";
import CallbackValidation from "../../utils/CallbackValidation";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import Form from "../Form/Form";
import { useCurrentUser } from "../../utils/CurrentUserContext";

function Login() {
  const formCallbackValidation = CallbackValidation();
  const { login, error } = useCurrentUser();
  const navigate = useNavigate();
  const { email, password } = formCallbackValidation.values;

  const [validationErrors, setValidationErrors] = useState({});

  const submitHandle = async (evt) => {
    evt.preventDefault();

    const errors = {};

    if (!email) {
      errors.email = "Требуется email";
    }

    if (!password) {
      errors.password = "Необходим пароль";
    }

    if (email && !isEmail(email)) {
      errors.email = "Некорректный email";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    await login(email, password);
    navigate("/movies");
    formCallbackValidation.resetForm();
  };

  return (
    <section className="login">
      <div className="login__container">
        <Link to="/">
          <img className="login__logo" src={logo} alt="Логотип" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <Form
          submitText={{
            buttonText: " Войти ",
            promt: " Зарегистрироваться ",
            route: "/signup",
            linkText: " Регистрация ",
          }}
          submitHandle={submitHandle}
          validation={formCallbackValidation}
          formName="login"
          loginError={error}
          validationErrors={validationErrors} 
        />
      </div>
    </section>
  );
}

export default Login;
