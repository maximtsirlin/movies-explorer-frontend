import React, {useEffect, useState} from 'react';
import './Profile.css';
import {useCurrentUser} from '../../../utils/UseCurrentUserContext';
import MainApi from '../../../utils/MainApi';
import errorIcon from '../../../assets/img/icon-error.svg';
import successIcon from '../../../assets/img/icon-success.svg';
import ImagePopup from "../../common/ImagePopup/ImagePopup";
import {ERROR, SUCCESS} from "../../../utils/constants";
import validation from "../../../utils/validation";

function Profile() {
	const {currentUser, logout, token, setCurrentUser} = useCurrentUser();
	const [name, setName] = useState(currentUser?.name);
	const [email, setEmail] = useState(currentUser?.email);
	const [disabled, setDisabled] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	const [modalData, setModalData] = useState({
		name: "",
		link: "",
	});
	const [errors, setErrors] = useState();

	const isSameProfileData = () => {
		console.log(currentUser, name, email);
		return currentUser?.name === name && currentUser?.email === email;
	};

	useEffect(() => {
		console.log("trigger");
		setDisabled(isSameProfileData());
	}, [name, email, currentUser]);

	useEffect(() => {
		setName(currentUser?.name)
		setEmail(currentUser?.email)
	}, [currentUser])


	useEffect(() => {
		if (!isSameProfileData()) {
			setDisabled(errors?.email);
		}
	}, [errors]);


	const handleEmailChange = (e) => {
		const value = e.target.value;
		const errors = validation('email', value);
		setErrors(errors);
		setEmail(value);
	};

	async function saveInfo(e) {
		e.preventDefault()
		setDisabled(true);
		MainApi.setInfo(name, email, token)
			.then(() => {
				setModalData({
					name: SUCCESS.EDIT,
					link: successIcon,
				});
				setCurrentUser({
					...currentUser,
					email: email,
					name: name
				});
				setIsOpen(true);
			})
			.catch((e) => {
				setModalData({
					name: ERROR.EDIT,
					link: errorIcon,
				});
				setIsOpen(true);
			})
			.finally(() => {
				if (!isSameProfileData()) {
					setDisabled(false);
				}
			});
	}

	return (
		<main className='profile'>
			<h1 className='profile__title'>Привет, {name}!</h1>
			<form
				className='profile__form'
				onSubmit={saveInfo}
			>
				<fieldset className='profile__fieldset'>
					<label className='profile__label' htmlFor='name'>
						Имя
					</label>
					<input
						className='profile__input'
						type='text'
						placeholder='name'
						id='name'
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</fieldset>
				<fieldset className='profile__fieldset'>
					<label className='profile__label' htmlFor='email'>
						E-mail
					</label>
					<input
						className='profile__input'
						type='email'
						placeholder='email'
						id='email'
						value={email}
						onChange={(e) => handleEmailChange(e)}
					/>
					<span className="profile__input_validation">{errors?.email}</span>
				</fieldset>
				<div className='profile__links'>
					<button className={`profile__btn-edit ${disabled && "disabled"}`} type='submit' disabled={disabled}>
						Редактировать
					</button>
					<button onClick={logout} className='profile__btn-logout'>
						Выйти из аккаунта
					</button>
				</div>
			</form>
			{isOpen && <ImagePopup card={modalData} onClose={() => {
				setIsOpen(false);
			}}/>}
		</main>
	);
}

export default Profile;
