import React, { useState } from "react";
import axios from "axios";

export default function AdminPanel() {
	const [pizzas, setPizzas] = useState([
		{
			id: 0,
			imageUrl: "https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg",
			name: "Пепперони Фреш с перцем",
			type: [0, 1],
			sizes: [26, 30, 40],
			price: 803,
			category: 0,
			rating: 4,
		},
		{
			id: 1,
			imageUrl: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg",
			name: "Сырная",
			type: [0],
			sizes: [26, 40],
			price: 245,
			category: 1,
			rating: 6,
		},
		{
			id: 2,
			imageUrl: "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/6652fec1-04df-49d8-8744-232f1032c44b.jpg",
			name: "Цыпленок барбекю",
			type: [0],
			sizes: [26, 40],
			price: 295,
			category: 1,
			rating: 4,
		},
	]);
	const [editPizza, setEditPizza] = useState(null);
	const [pizzaData, setPizzaData] = useState({
		name: "",
		sizes: [],
		type: [],
		price: "",
		image: null,
	});

	const handlePizzaChange = (event) => {
		const { name, value, type, checked } = event.target;

		if (type === "checkbox") {
			let updatedValues;
			if (checked) {
				updatedValues = [...pizzaData[name], value];
			} else {
				updatedValues = pizzaData[name].filter((item) => item !== value);
			}
			setPizzaData({ ...pizzaData, [name]: updatedValues });
		} else if (type === "file") {
			setPizzaData({ ...pizzaData, [name]: event.target.files[0] });
		} else {
			setPizzaData({ ...pizzaData, [name]: value });
		}
	};

	const handleAddPizza = () => {
		setPizzas([...pizzas, pizzaData]);
		setPizzaData({
			name: "",
			sizes: [],
			type: [],
			price: "",
			image: null,
		});
	};

	const handleDeletePizza = (index) => {
		const newPizzas = [...pizzas];
		newPizzas.splice(index, 1);
		setPizzas(newPizzas);
	};

	const handleEditPizza = (index) => {
		setEditPizza(index);
		setPizzaData(pizzas[index]);
	};

	const handleSaveEdit = async (id) => {
		try {
			await axios.put(`http://localhost:5000/editPizza/${id}`, pizzaData);
			const newPizzas = [...pizzas];
			newPizzas[editPizza] = pizzaData;
			setPizzas(newPizzas);
			setEditPizza(null);
			setPizzaData({
				name: "",
				sizes: [],
				type: [],
				price: "",
				image: null,
			});
		} catch (error) {
			console.error("Error saving pizza:", error);
		}
	};

	return (
		<div className="container">
			<div id="pizzas-list">
				<h2>Список пицц</h2>
				<table>
					<thead>
						<tr>
							<th>Название</th>
							<th>Размеры</th>
							<th>Тип</th>
							<th>Стоимость</th>
							<th>Действия</th>
						</tr>
					</thead>
					<tbody>
						{pizzas.map((pizza, index) => (
							<tr key={index}>
								<td>
									{editPizza === index ? (
										<input
											type="text"
											className="edit-input"
											value={pizzaData.name}
											onChange={(e) => setPizzaData({ ...pizzaData, name: e.target.value })}
										/>
									) : (
										pizza.name
									)}
								</td>
								<td>
									{editPizza === index ? (
										<input
											type="text"
											className="edit-input"
											value={pizzaData.sizes.join(", ")}
											onChange={(e) => setPizzaData({ ...pizzaData, sizes: e.target.value.split(", ") })}
										/>
									) : (
										pizza.sizes.join(", ")
									)}
								</td>
								<td>
									{editPizza === index ? (
										<input
											type="text"
											className="edit-input"
											value={pizzaData.type.join(", ")}
											onChange={(e) => setPizzaData({ ...pizzaData, type: e.target.value.split(", ") })}
										/>
									) : (
										pizza.type.join(", ")
									)}
								</td>
								<td>
									{editPizza === index ? (
										<input
											type="text"
											className="edit-input"
											value={pizzaData.price}
											onChange={(e) => setPizzaData({ ...pizzaData, price: e.target.value })}
										/>
									) : (
										pizza.price
									)}
								</td>
								<td>
									{editPizza === index ? (
										<div className="edit-actions">
											<button
												className="save-btn"
												onClick={() => handleSaveEdit(pizza.id)}
											>
												Сохранить
											</button>
											<button
												className="cancel-btn"
												onClick={() => setEditPizza(null)}
											>
												Отмена
											</button>
										</div>
									) : (
										<div className="edit-actions">
											<button onClick={() => handleEditPizza(index)}>Редактировать</button>
											<button
												onClick={() => handleDeletePizza(index)}
												className="cancel-btn"
											>
												Удалить
											</button>
										</div>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
