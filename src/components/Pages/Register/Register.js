import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import "./Register.css";
import Form from "../../Form/Form";
import logo from "../../../images/logo.svg";
import CallbackValidation from "../../../utils/CallbackValidation";
import MainApi from "../../../utils/MainApi";
import {useCurrentUser} from "../../../utils/CurrentUserContext";
import Modal from "../../common/Modal/Modal";

function Register() {
	const formCallbackValidation = CallbackValidation();
	const {login} = useCurrentUser();
	const [error, setError] = useState(false);
	const {email, password, name} = formCallbackValidation.values;
	const {values, onFocus, handleChange, isFocused, errors} =
		formCallbackValidation;

	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [disabled, setDisabled] = useState(false);

	const submitHandle = (e) => {
		e.preventDefault();
		setDisabled(true);
		if (!name || !email || !password) {
			setErrorMsg("Не все поля заполнены");
			setIsOpen(true);
			return;
		}
		MainApi.register(name, email, password)
			.then(() => {
				login(email, password).then(() => {
					formCallbackValidation.resetForm();
					navigate("/movies");
				});
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
		<section className="register">
			<div className="register__container">
				<Link to="/">
					<img className="register__logo" src={logo} alt="Логотип"/>
				</Link>
				<h1 className="register__title">Добро пожаловать!</h1>
				<Form
					disabled={disabled}
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
						/>
						<span className="form__input-error">
              {isFocused && errors.name}
            </span>
					</fieldset>
				</Form>
				{isOpen && <Modal setIsOpen={setIsOpen} title={"Ошибка"} text={errorMsg}/>}
			</div>
		</section>
	);
}

export default Register;
