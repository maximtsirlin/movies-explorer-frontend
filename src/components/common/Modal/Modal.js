import React from "react";
import "./Modal.css";

const Modal = ({ setIsOpen, title, text }) => {
	return (
		<>
			<div className={"darkBG"} onClick={() => setIsOpen(false)} />
			<div className={"centered"}>
				<div className={"modal"}>
					<div className={"modalHeader"}>
						<h5 className={"heading"}>{title}</h5>
					</div>
					<div className={"modalContent"}>
						{text}
					</div>
					<div className={"modalActions"}>
						<div className={"actionsContainer"}>
							<button className={"deleteBtn"} onClick={() => setIsOpen(false)}>
								ОК
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
