import React from "react";
import Categories from "../components/Categories";
import SortPopup from "../components/SortPopup";
import PizzaItem from "../components/PizzaItem";
import axios from "axios";

export default function Main() {
	const [pizza, setPizza] = React.useState([]);
	const [pizzaCart, setPizzaCart] = React.useState([]);
	const [activeCategory, setActiveCategory] = React.useState(0);
	const [sortBy, setSortBy] = React.useState(null);

	React.useEffect(() => {
		async function fetchData() {
			try {
				const token = localStorage.getItem("token");
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

				setPizzaCart(cartItems);
				setPizza(pizzasData);
			} catch (error) {
				console.error("Ошибка при получении данных:", error);
				alert("Произошла ошибка при загрузке данных. Пожалуйста, повторите попытку.");
			}
		}

		fetchData();
	}, []);

	const sortFunctions = {
		popular: (a, b) => b.rating - a.rating,
		price_asc: (a, b) => a.price - b.price,
		price_desc: (a, b) => b.price - a.price,
		alphabet: (a, b) => a.name.localeCompare(b.name),
	};

	const sortedPizza = React.useMemo(() => {
		let sorted = [...pizza];
		if (sortBy && sortFunctions[sortBy]) {
			sorted.sort(sortFunctions[sortBy]);
		}
		return sorted;
	}, [sortBy, pizza]);

	const onSelectSortType = (type) => {
		setSortBy(type);
	};

	const handleCategoryClick = (index) => {
		setActiveCategory(index);
	};

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					activeCategory={activeCategory}
					onCategoryClick={handleCategoryClick}
				/>
				<SortPopup onSelectSortType={onSelectSortType} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{sortedPizza.map((obj) => (
					<PizzaItem
						key={obj.id}
						pizzaCart={pizzaCart}
						{...obj}
					/>
				))}
			</div>
		</div>
	);
}
