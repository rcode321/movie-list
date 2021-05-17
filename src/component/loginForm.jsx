import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
   state = {
      account: { username: "", password: "" },
      errors: {},
   };

   validate = () => {
      return { username: "Username is required" };
   };

   handleSubmit = (e) => {
      e.preventDefault();

      const errors = this.validate();
      this.setState({ errors });
      if (errors) return;

      console.log("Submitted");
   };

   handleChange = ({ currentTarget: input }) => {
      const account = { ...this.state.account };
      account[input.name] = input.value;
      this.setState({ account });
      console.log(account);
   };

   render() {
      const { account } = this.state;

      return (
         <div>
            <h1 className="text-center">Login</h1>
            <form onSubmit={this.handleSubmit} className="col-sm-7 mx-auto">
               <Input
                  name="username"
                  value={account.username}
                  label="Username"
                  onChange={this.handleChange}
               />
               <Input
                  name="password"
                  value={account.password}
                  label="Password"
                  onChange={this.handleChange}
               />

               <button className="btn btn-primary">Login</button>
            </form>
         </div>
      );
   }
}

export default LoginForm;
