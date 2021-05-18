import React, { Component } from "react";
import Joi from "joi";

import Input from "./common/input";

class LoginForm extends Component {
	state = {
		account: { username: "", password: "" },
		errors: {},
	};

	validate = () => {
		const schema = Joi.object({
			username: Joi.string().required().label("Username"),
			password: Joi.string().required().label("Password"),
		});
		const options = { abortEarly: false };
		const { error } = schema.validate(this.state.account, options);
		console.log(error.details);

		if (!error) return null;

		const errors = {};
		error.details.map((item) => (errors[item.path[0]] = item.message));
		return errors;
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		console.log("Submitted");
	};
	validateProperty = ({ name, value }) => {
		if (name === "username") {
			if (value.trim() === "") return "Username is required";
		}
		if (name === "password") {
			if (value.trim() === "") return "Password is required";
		}
	};

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const account = { ...this.state.account };
		account[input.name] = input.value;

		this.setState({ account, errors });
	};

	render() {
		const { account, errors } = this.state;

		return (
			<div>
				<h1 className="text-center">Login</h1>
				<form onSubmit={this.handleSubmit} className="col-sm-7 mx-auto">
					<Input
						name="username"
						value={account.username}
						label="Username"
						onChange={this.handleChange}
						error={errors.username}
					/>
					<Input
						name="password"
						value={account.password}
						label="Password"
						onChange={this.handleChange}
						error={errors.password}
					/>

					<button className="btn btn-primary">Login</button>
				</form>
			</div>
		);
	}
}

export default LoginForm;
