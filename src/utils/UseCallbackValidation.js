import React from "react";
import validation from "./validation";

function UseCallbackValidation() {
	const [values, setValues] = React.useState({});
	const [errors, setErrors] = React.useState({});
	const [isValid, setIsValid] = React.useState(false);
	const [isFocused, setIsFocused] = React.useState(false);
	console.log(errors);
	const onFocus = () => {
		setIsFocused(true);
	};

	const handleChange = (event) => {
		const {target} = event;
		const {name, value} = target;
		const error = validation(name, value);

		let updatedErrors = {...errors};
		if (Object.keys(error).length > 0) {
			updatedErrors[name] = error[name];
		} else {
			delete updatedErrors[name];
		}
		setErrors(updatedErrors);
		setValues(prevValues => ({...prevValues, [name]: value}));

		if (Object.keys(updatedErrors).length === 0) {
			setIsValid(target.closest("form").checkValidity());
		} else {
			setIsValid(false);
		}
	};

	const resetForm = React.useCallback(
		(newErrors = {}, newIsValid = false) => {
			setErrors(newErrors);
			setIsValid(newIsValid);
		},
		[setErrors, setIsValid]
	);

	return {
		values,
		handleChange,
		errors,
		isValid,
		resetForm,
		onFocus,
		isFocused,
		setValues,
	};
}

export default UseCallbackValidation;
