import React, {useState} from "react";
import "./Login.css";
import UseCallbackValidation from "../../utils/UseCallbackValidation";
import {Link, useNavigate} from "react-router-dom";
import logo from "../../images/logo.svg";
import Form from "../Form/Form";
import {useCurrentUser} from "../../utils/UseCurrentUserContext";
import ImagePopup from "../ImagePopup/ImagePopup";
import errorIcon from '../../assets/img/icon-error.svg';

function Login() {
	const formCallbackValidation = UseCallbackValidation();
	const {login, error} = useCurrentUser();
	const navigate = useNavigate();
	const {email, password} = formCallbackValidation.values;

	const [disabled, setDisabled] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [modalData, setModalData] = useState({
		name: "",
		link: "",
	});

	const submitHandle = async (evt) => {
		evt.preventDefault();
		setDisabled(true);
		login(email, password)
			.then(() => {
				navigate("/movies");
				formCallbackValidation.resetForm();
			})
			.catch((e) => {
				setModalData({
					name: e.message,
					link: errorIcon,
				});
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
					<img className="login__logo" src={logo} alt="Логотип"/>
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
				{/*{isOpen && <Modal setIsOpen={setIsOpen} title={"Ошибка"} text={errorMsg}/>}*/}
				{isOpen && <ImagePopup card={modalData} onClose={() => setIsOpen(false)}/>}
			</div>
		</section>
	);
}

export default Login;
