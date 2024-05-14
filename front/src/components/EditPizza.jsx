import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function EditPizza() {
	const [pizzas, setPizzas] = useState([]);
	const [editPizza, setEditPizza] = useState(null);
	const [pizzaData, setPizzaData] = useState({
		name: "",
		sizes: "",
		type: "",
		price: "",
		imageURL: "",
		imageFile: null,
	});
	const [imageLoaded, setImageLoaded] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarOpenEdit, setSnackbarOpenEdit] = useState(false);

	const fileInputRef = useRef(null);

	useEffect(() => {
		// Запрос данных с сервера при загрузке компонента
		axios
			.get("http://localhost:5000/pizzas")
			.then((response) => {
				setPizzas(response.data);
			})
			.catch((error) => {
				console.error("Error fetching pizzas:", error);
			});
	}, []);

	const handlePizzaChange = (event) => {
		const { name, value, type, files } = event.target;

		if (type === "file") {
			setPizzaData({ ...pizzaData, imageURL: "", imageFile: files[0] });
			setImageLoaded(false);
		} else {
			setPizzaData({ ...pizzaData, [name]: value });
		}
	};

	const handleDeletePizza = async (index) => {
		try {
			await axios.delete(`http://localhost:5000/deletePizza/${index + 1}`);
			const newPizzas = [...pizzas];
			newPizzas.splice(index, 1);
			setPizzas(newPizzas);
			setSnackbarOpen(true);
		} catch (error) {
			alert("Ошибка удаления пиццы");
		}
	};

	const handleEditPizza = (index) => {
		setEditPizza(index);
		setPizzaData(pizzas[index]);
		setEditMode(true);
	};
	const handleSaveEdit = async (id) => {
		try {
			console.log(pizzaData);
			const formData = new FormData();
			formData.append("name", pizzaData.name);
			formData.append("sizes", pizzaData.sizes);
			formData.append("category", pizzaData.category);
			formData.append("types", pizzaData.types);
			formData.append("rating", pizzaData.rating);
			formData.append("price", pizzaData.price);
			formData.append("imageFile", pizzaData.imageFile);
			formData.append("imageURL", pizzaData.imageURL);
			await axios.put(`http://localhost:5000/editPizza/${id}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			// console.log(pizzaData);
			const newPizzas = [...pizzas];
			newPizzas[editPizza] = pizzaData;
			setPizzas(newPizzas);
			setEditPizza(null);
			setPizzaData({
				name: "",
				sizes: "",
				type: "",
				price: "",
				imageURL: "",
				imageFile: null,
			});
			setEditMode(false);
			setSnackbarOpenEdit(true);
		} catch (error) {
			console.error("Error saving pizza:", error);
		}
	};

	const closeEdit = () => {
		setEditPizza(null);
		setEditMode(false);
	};
	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setSnackbarOpen(false);
	};
	return (
		<div className="container">
			<div id="pizzas-list">
				<h2>Список пицц</h2>
				<table>
					<thead>
						<tr>
							<th>Изображение</th>
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
								<td className="td-table">
									<>
										<input
											type="text"
											className="edit-input"
											value={editPizza === index || !editMode ? pizzaData.imageURL : pizza.imageURL}
											onChange={handlePizzaChange}
											name="imageURL"
											disabled={!editMode}
										/>
										<input
											ref={fileInputRef}
											type="file"
											accept="image/*"
											onChange={handlePizzaChange}
											name="imageFile"
											disabled={!editMode}
										/>
										{imageLoaded && <div>Изображение загружено</div>}
									</>
								</td>
								<td>
									{editPizza === index ? (
										<input
											type="text"
											className="edit-input"
											value={pizzaData.name}
											onChange={handlePizzaChange}
											name="name"
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
											value={pizzaData.sizes}
											onChange={handlePizzaChange}
											name="sizes"
										/>
									) : (
										pizza.sizes
									)}
								</td>
								<td>
									{editPizza === index ? (
										<input
											type="text"
											className="edit-input"
											value={pizzaData.types}
											onChange={handlePizzaChange}
											name="type"
										/>
									) : (
										pizza.types
									)}
								</td>
								<td>
									{editPizza === index ? (
										<input
											type="text"
											className="edit-input"
											value={pizzaData.price}
											onChange={handlePizzaChange}
											name="price"
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
												onClick={closeEdit}
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
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={2000}
				onClose={handleSnackbarClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
			>
				<MuiAlert
					elevation={6}
					variant="filled"
					onClose={handleSnackbarClose}
					severity="info"
					sx={{ backgroundColor: "green" }}
				>
					Пицца удалена
				</MuiAlert>
			</Snackbar>
			<Snackbar
				open={snackbarOpenEdit}
				autoHideDuration={2000}
				onClose={handleSnackbarClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
			>
				<MuiAlert
					elevation={6}
					variant="filled"
					onClose={handleSnackbarClose}
					severity="info"
					sx={{ backgroundColor: "green" }}
				>
					Данные изменены!
				</MuiAlert>
			</Snackbar>
		</div>
	);
}
