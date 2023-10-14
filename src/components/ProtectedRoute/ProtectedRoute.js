import React from "react";
import {Route, useNavigate, Navigate} from "react-router-dom";

export default ({children, ...props}) => {
	if (!props.loggedIn) {
		return <Navigate to="/" replace/>;
	}
	return children;
};
