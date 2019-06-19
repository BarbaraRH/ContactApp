const getState = ({ getStore, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			showMore: (category, nextCategory) => {
				const store = getStore();
				fetch(store[nextCategory])
					.then(resp => resp.json())
					.then(data => {
						let concats = store[category].concat(data.results);
						store[category] = concats;
						if ("next" in data) {
							store[nextCategory] = data.next;
						} else {
							store[nextCategory] = "";
						}
						setStore({ store: store });
					})
					.catch(error => console.log(error));
			},
			favCard: (property, id) => {
				const store = getStore();
				store.favorites.push(store[property][id]);
				store[property][id].category = property;
				store[property][id].position = id;
				store[property][id].saved = true;
				setStore({ store: store });
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
