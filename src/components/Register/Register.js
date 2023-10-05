import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import Form from "../Form/Form";
import logo from "../../images/logo.svg";
import CallbackValidation from "../../utils/CallbackValidation";
import MainApi from "../../utils/MainApi";
import useLogin from "../../hooks/useLogin";

function Register() {
  const formCallbackValidation = CallbackValidation();
  const { login } = useLogin();
  const [error, setError] = useState("");
  const { email, password, name } = formCallbackValidation.values;
  const { values, onFocus, handleChange, isFocused, errors } =
    formCallbackValidation;

  const navigate = useNavigate();

  async function handleRegister(name, email, password) {
    try {
      console.log("name", name);
      console.log("email", email);
      console.log("password", password);
      await MainApi.register(name, email, password);
      await login(email, password);
      navigate("/signin");
    } catch (e) {
      setError(e.message);
      console.error(e);
    }
  }

  const submitHandle = (evt) => {
    evt.preventDefault();

    if (formCallbackValidation.isValid()) {
      handleRegister(name, email, password);
      formCallbackValidation.resetForm();
    } else {
      setError("Please fill in all required fields and provide a valid email.");
    }
  };

  return (
    <section className="register">
      <div className="register__container">
        <Link to="/">
          <img className="register__logo" src={logo} alt="Логотип" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <Form
          submitText={{
            buttonText: "Зарегистрироваться",
            promt: " Уже зарегистрированы?",
            route: "/signin",
            linkText: "Войти",
          }}
          registeredError={error}
          validation={formCallbackValidation}
          submitHandle={submitHandle}
          formName="register"
          className="register__form"
        >
          <fieldset className="register__fieldset">
            <label className="register__label" htmlFor="name">
              Имя
            </label>
            <input
              type="text"
              placeholder="Введите имя"
              id="name"
              name="name"
              className={`form__input ${errors.name && "form__input-invalid"}`}
              minLength="2"
              maxLength="30"
              value={values.name || ""}
              onFocus={onFocus}
              onChange={handleChange}
              required
            />
            <span className="form__input-error">
              {isFocused && errors.name}
            </span>
          </fieldset>

          <fieldset className="register__fieldset">
            <label className="register__label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Введите email"
              id="email"
              name="email"
              className={`form__input ${errors.email && "form__input-invalid"}`}
              value={values.email || ""}
              onFocus={onFocus}
              onChange={handleChange}
              required
            />
            <span className="form__input-error">
              {isFocused && errors.email}
            </span>
          </fieldset>
        </Form>
      </div>
    </section>
  );
}

export default Register;
