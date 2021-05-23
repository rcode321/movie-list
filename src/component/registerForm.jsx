import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
	state = {
		data: { name: "", password: "", email: "" },
		errors: {},
	};

	schema = {
		name: Joi.string().required().label("Username"),
		password: Joi.string().min(5).label("Password"),
		email: Joi.string()
			.email({
				minDomainSegments: 2,
				tlds: { allow: ["com", "net"] },
			})
			.label("Email"),
	};

	doSubmit = () => {
		// call the server
		console.log("Submitted");
	};
	render() {
		return (
			<div>
				<h1 className="text-center">Register</h1>
				<form onSubmit={this.handleSubmit} className="col-sm-7 mx-auto">
					{this.renderInput("email", "Username")}
					{this.renderInput("password", "Password", "password")}
					{this.renderInput("name", "Name")}
					{this.renderButton("Register")}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
