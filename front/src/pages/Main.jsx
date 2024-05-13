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
	const [isLoading, setIsLoading] = React.useState(false);

	React.useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			try {
				const token = localStorage.getItem("token");
				const pizzasResponse = await axios.get("http://localhost:5000/pizzas");

				setPizza(pizzasResponse.data);

				// Проверяем наличие токена перед запросом корзины
				if (token) {
					const cartResponse = await axios.get("http://localhost:5000/getCart", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					const cartItems = cartResponse.data.user_cart;
					setPizzaCart(cartItems);
				}
			} catch (error) {
				console.error("Ошибка при получении данных:", error);
				alert("Произошла ошибка при загрузке данных. Пожалуйста, повторите попытку.");
			} finally {
				setIsLoading(false);
			}
		}

		fetchData();
	}, []);
	const sortedPizza = React.useMemo(() => {
		const sortFunctions = {
			popular: (a, b) => b.rating - a.rating,
			price_asc: (a, b) => a.price - b.price,
			price_desc: (a, b) => b.price - a.price,
			alphabet: (a, b) => a.name.localeCompare(b.name),
		};

		let sorted = [...pizza];

		// Фильтрация по категории
		if (activeCategory !== 0) {
			sorted = sorted.filter((item) => item.category === activeCategory);
		}

		// Сортировка
		if (sortBy && sortFunctions[sortBy]) {
			sorted.sort(sortFunctions[sortBy]);
		}

		return sorted;
	}, [sortBy, pizza, activeCategory]);

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
			{isLoading ? (
				<div className="loaderContainer">
					<span className="loader"></span>
				</div>
			) : (
				<div className="content__items">
					{sortedPizza.map((obj) => (
						<PizzaItem
							key={obj.id}
							pizzaCart={pizzaCart}
							{...obj}
						/>
					))}
				</div>
			)}
		</div>
	);
}
