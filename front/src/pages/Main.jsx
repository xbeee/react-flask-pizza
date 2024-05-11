import React from "react";
import Categories from "../components/Categories";
import SortPopup from "../components/SortPopup";
import PizzaItem from "../components/PizzaItem";
import axios from "axios";

export default function Main() {
	const [pizza, setPizza] = React.useState([]);

	React.useEffect(() => {
		async function fetchPizzas() {
			try {
				const response = await axios.get("http://localhost:5000/pizzas");
				setPizza(response.data);
				console.log(response);
			} catch (error) {
				alert("Ошибка получения данных");
			}
		}
		fetchPizzas();
	}, []);

	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<SortPopup />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{pizza.map((obj) => (
					<PizzaItem
						key={obj.id}
						{...obj}
					/>
				))}
			</div>
		</div>
	);
}
