import React from "react";
import getState from "./flux.js";

// Don't change, here is where we initialize our context, by default its just going to be Null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to Layout.jsx, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.jsx#L35
const injectContext = PassedComponent => {
	class StoreWrapper extends React.Component {
		constructor(props) {
			super(props);

			//this will be passed as the contenxt value
			this.state = getState({
				getStore: () => this.state.store,
				setStore: updatedStore =>
					this.setState({
						store: Object.assign(this.state.store, updatedStore)
					})
			});
		}

		componentDidMount() {
			/**
			 * EDIT THIS!
			 * This function is the equivalent to "window.onLoad", it only run once on the entire application lifetime
			 * you should do your ajax requests or fetch api requests here
			 **/
			fetch("https://assets.breatheco.de/apis/fake/contact/agenda/downtown_vi")
				.then(resp => resp.json())
				.then(data => {
					this.setState({
						store: {
							...this.state.store,
							contactNames: data
						}
					});
					console.log(this.state.store);
				})
				.catch(error => console.log(error));
			/* fetch("https://assets.breatheco.de/apis/fake/contact/agenda")
				.then(resp => resp.json())
				.then(data => {
					this.setState({
						store: {
							...this.state.store,
							contactNames: data,
							contactDetails: []
						}
					});
					for (let i in this.state.store.contactNames) {
						fetch(
							"https://assets.breatheco.de/apis/fake/contact/agenda/" + this.state.store.contactNames[i]
						)
							.then(resp => resp.json())
							.then(data => {
								this.state.store.contactDetails.push(data);
								this.setState({
									store: this.state.store
								});
							})
							.catch(error => console.log(error));
					}
					console.log(this.state.store);
				})
				.catch(error => console.log(error)); */
		}

		render() {
			// the initial value for the context its not null anymore, but the current state of this component,
			// the context will have a getStore and setStore functions available then, because they were declared
			// on the state of this component
			return (
				<Context.Provider value={this.state}>
					<PassedComponent {...this.props} />
				</Context.Provider>
			);
		}
	}
	return StoreWrapper;
};

export default injectContext;

/*

[
    {
        "id": "56",
        "agenda_slug": "downtown_vi",
        "full_name": "Brian Logsdo",
        "email": "brian@gmail.com",
        "phone": "(132)432-9584",
        "address": "142 7th Ct, 33434 FL, USA",
        "created_at": "2019-01-05 14:46:41"
    },
    {
        "id": "61",
        "agenda_slug": "downtown_vi",
        "full_name": "Danny Danger",
        "email": "danger@gmail.com",
        "phone": "(345)588-2394",
        "address": "735 Danger Drive",
        "created_at": "2019-01-07 00:11:11"
    },
    {
        "id": "62",
        "agenda_slug": "downtown_vi",
        "full_name": "Paolo Lucano",
        "email": "pluco2010@gmail.com",
        "phone": "3057257153",
        "address": "8000 West Dr #227",
        "created_at": "2019-01-08 22:59:35"
    },
    {
        "id": "114",
        "agenda_slug": "downtown_vi",
        "full_name": "asas",
        "email": "dangasaser@gmail.com",
        "phone": "3434",
        "address": "adadad",
        "created_at": "2019-04-23 00:13:38"
    }
]

 */
