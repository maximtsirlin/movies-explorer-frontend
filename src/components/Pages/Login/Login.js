import React, {useState} from "react";
import "./Login.css";
import CallbackValidation from "../../../utils/CallbackValidation";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../images/logo.svg";
import Form from "../../Form/Form";
import { useCurrentUser } from "../../../utils/CurrentUserContext";
import Modal from "../../common/Modal/Modal";

function Login() {
  const formCallbackValidation = CallbackValidation();
  const { login, error } = useCurrentUser();
  const navigate = useNavigate();
  const { email, password } = formCallbackValidation.values;

  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [disabled, setDisabled] = useState(false);

  const submitHandle = async (evt) => {
    evt.preventDefault();
    setDisabled(true);
    login(email, password)
      .then(() => {
        navigate("/movies");
        formCallbackValidation.resetForm();
      })
      .catch((e) => {
        setErrorMsg(e.message);
        setIsOpen(true);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  return (
    <section className="login">
      <div className="login__container">
        <Link to="/">
          <img className="login__logo" src={logo} alt="Логотип" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <Form
          disabled={disabled}
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
        />
        {isOpen && <Modal setIsOpen={setIsOpen} title={"Ошибка"} text={errorMsg}/>}
      </div>
    </section>
  );
}

export default Login;
