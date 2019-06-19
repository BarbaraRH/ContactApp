import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import { BrowserHistory, BrowserRouter, Route, Switch } from "react-router-dom";

import { Context } from "../store/appContext";

export default class AddContacts extends Flux.View {
	render() {
		return (
			<div className="container">
				<div>
					<h1 className="text-center mt-5">Add a new contact</h1>
					<Context.Consumer>
						{({ store, actions }) => {
							return (
								<form
									onSubmit={() => {
										actions.addContact(event);
										this.props.history.goBack();
									}}>
									<div className="form-group">
										<label>Full Name</label>
										<input
											name="name"
											type="text"
											className="form-control"
											placeholder="Full Name"
										/>
									</div>
									<div className="form-group">
										<label>Email</label>
										<input
											name="email"
											type="email"
											className="form-control"
											placeholder="Enter email"
										/>
									</div>
									<div className="form-group">
										<label>Phone</label>
										<input
											name="phone"
											type="phone"
											className="form-control"
											placeholder="Enter phone"
										/>
									</div>
									<div className="form-group">
										<label>Address</label>
										<input
											name="address"
											type="text"
											className="form-control"
											placeholder="Enter address"
										/>
									</div>
									<button className="btn btn-primary form-control">save</button>
									<Link className="mt-3 w-100 text-center" to="/">
										or get back to contacts
									</Link>
								</form>
							);
						}}
					</Context.Consumer>
				</div>
			</div>
		);
	}
}
