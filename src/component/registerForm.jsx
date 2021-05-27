import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
	state = {
		data: { username: "", password: "", name: "" },
		errors: {},
	};

	schema = {
		username: Joi.string().required().email().label("Username"),
		password: Joi.string().min(5).label("Password"),
		name: Joi.string().label("Name"),
	};

	doSubmit = async () => {
		// call the server
		// in order catch error in a server
		// should wrap in a try catch block
		try {
			const response = await register(this.state.data);
			auth.loginWithJwt(response.headers["x-auth-token"]);
			// this.props.history.push("/");
			// Full re render and the app.js component life cycle will a new JWT
			window.location = "/";
			console.log(response);
			console.log("Submitted");
		} catch (err) {
			if (err.response && err.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = err.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		return (
			<div>
				<h1 className="text-center">Register</h1>
				<form onSubmit={this.handleSubmit} className="col-sm-7 mx-auto">
					{this.renderInput("username", "Username")}
					{this.renderInput("password", "Password", "password")}
					{this.renderInput("name", "Name")}
					{this.renderButton("Register")}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
