import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";

import ContactCard from "../components/ContactCard";
import Modal from "../components/Modal";
import avatar1 from "../../img/user_1.jpg";

import { Context } from "../store/appContext";

export default class Contacts extends Flux.View {
	constructor() {
		super();
		this.state = {
			showModal: false
		};
	}
	render() {
		return (
			<div className="container">
				<div>
					<p className="text-right my-3">
						<Link className="btn btn-success" to="/add">
							Add new contact
						</Link>
					</p>
					<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
						<ul className="list-group pull-down" id="contact-list">
							<Context.Consumer>
								{({ store, actions }) => {
									if ("contactNames" in store) {
										return store.contactNames.map((item, index) => {
											return (
												<ContactCard
													key={index}
													onDelete={() => this.setState({ showModal: true })}
													name={item.full_name}
													adress={item.address}
													phone={item.phone}
													email={item.email}
												/>
											);
										});
									}
								}}
							</Context.Consumer>
						</ul>
					</div>
				</div>
				<Modal show={this.state.showModal} onClose={() => this.setState({ showModal: false })} />
			</div>
		);
	}
}
