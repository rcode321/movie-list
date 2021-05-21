import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
	state = {
		data: { username: "", password: "" },
		errors: {},
	};

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	};

	doSubmit = () => {
		// call the server
		console.log("Submitted");
	};

	render() {
		return (
			<div>
				<h1 className="text-center">Login</h1>
				<form onSubmit={this.handleSubmit} className="col-sm-7 mx-auto">
					{this.renderInput("username", "Username", "username")}
					{this.renderInput("password", "Password", "password")}
					{this.renderButton("Login")}
				</form>
			</div>
		);
	}
}

export default LoginForm;
