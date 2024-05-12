import React from "react";
import Categories from "../components/Categories";
import SortPopup from "../components/SortPopup";
import PizzaItem from "../components/PizzaItem";
import axios from "axios";

export default function Main() {
	const [pizza, setPizza] = React.useState([]);
	const [pizzaCart, setPizzaCart] = React.useState([]);
	React.useEffect(() => {
		async function fetchData() {
			try {
				const token = localStorage.getItem("token");
				// Выполняем оба запроса параллельно
				const [cartResponse, pizzasResponse] = await Promise.all([
					axios.get("http://localhost:5000/getCart", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}),
					axios.get("http://localhost:5000/pizzas"),
				]);

				const cartItems = cartResponse.data.user_cart;
				const pizzasData = pizzasResponse.data;

				// Устанавливаем состояния после получения данных
				setPizzaCart(cartItems);
				setPizza(pizzasData);
			} catch (error) {
				console.error("Ошибка при получении данных:", error);
				alert("Произошла ошибка при загрузке данных. Пожалуйста, повторите попытку.");
			}
		}

		fetchData();
	}, []);

	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<SortPopup />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{pizza.map((obj) => {
					return (
						<PizzaItem
							key={obj.id}
							pizzaCart={pizzaCart}
							{...obj}
						/>
					);
				})}
			</div>
		</div>
	);
}
