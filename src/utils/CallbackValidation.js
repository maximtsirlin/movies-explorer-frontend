import React from "react";
import validation from "./validation";

function CallbackValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
console.log(errors);
  const onFocus = () => {
    setIsFocused(true);
  };

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    const error = validation(name, value);
   
    if (error) {
      console.log('-', error);
      setErrors({...errors, ...error})
    } else {
      const tmp = errors;
      delete errors[name]
      setErrors(tmp)
    }
    setErrors(error);
    setValues({ ...values, [name]: value });
    if (Object.keys(error).length === 0) {
      setIsValid(target.closest("form").checkValidity());
    } else {setIsValid(false)}
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

export default CallbackValidation;