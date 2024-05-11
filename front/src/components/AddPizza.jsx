import React from "react";
import axios from "axios";

export default function AddPizza() {
	const [previewImage, setPreviewImage] = React.useState("");
	const [imageName, setImageName] = React.useState("");
	const [pizzaData, setPizzaData] = React.useState({
		name: "",
		sizes: [],
		type: [],
		price: "",
		image: null,
	});

	// Обработчик изменения значения в полях ввода
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
			const file = event.target.files[0];
			setPreviewImage(URL.createObjectURL(file));
			setPizzaData({ ...pizzaData, [name]: file });
			setImageName(file.name); // Сохранение имени файла
		} else {
			setPizzaData({ ...pizzaData, [name]: value });
		}
	};

	// Обработчик добавления новой пиццы
	const handleAddPizza = async (event) => {
		event.preventDefault();

		// Создаем объект formData
		const formData = new FormData();
		formData.append("name", pizzaData.name);
		formData.append("price", pizzaData.price);
		formData.append("image", pizzaData.image);
		formData.append("imageName", imageName);
		pizzaData.sizes.forEach((size) => formData.append("sizes", size));
		pizzaData.type.forEach((type) => formData.append("type", type));

		// Отправляем данные на сервер с помощью Axios
		try {
			const response = await axios.post("http://localhost:5000/addItem", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log("Данные успешно отправлены на сервер", response.data);
		} catch (error) {
			console.error("Ошибка:", error.message);
		}

		// Очистка формы после отправки
		setPizzaData({
			name: "",
			sizes: [],
			type: [],
			price: "",
			image: null,
		});
		setPreviewImage("");
		setImageName("");
	};

	return (
		<>
			<div id="add-pizza-block">
				<h2>Добавить пиццу в магазин</h2>
				<form
					id="pizza-form"
					onSubmit={handleAddPizza}
					encType="multipart/form-data"
				>
					<label htmlFor="pizza-name">Название пиццы:</label>
					<input
						type="text"
						id="pizza-name"
						name="name"
						value={pizzaData.name}
						onChange={handlePizzaChange}
						required
					/>
					<label htmlFor="pizza-sizes">Размеры пиццы:</label>
					<div className="checkbox-container">
						<input
							type="checkbox"
							id="size-26"
							name="sizes"
							value="26см"
							onChange={handlePizzaChange}
						/>
						<label htmlFor="size-26">26см</label>
					</div>

					<div className="checkbox-container">
						<input
							type="checkbox"
							id="size-30"
							name="sizes"
							value="30см"
							onChange={handlePizzaChange}
						/>
						<label htmlFor="size-30">30см</label>
					</div>
					<div className="checkbox-container">
						<input
							type="checkbox"
							id="size-40"
							name="sizes"
							value="40см"
							onChange={handlePizzaChange}
						/>
						<label htmlFor="size-40">40см</label>
					</div>
					<label htmlFor="pizza-price">Стоимость пиццы:</label>
					<input
						type="number"
						id="pizza-price"
						name="price"
						value={pizzaData.price}
						onChange={handlePizzaChange}
						required
					/>
					<label htmlFor="pizza-type">Тип пиццы:</label>
					<br />
					<div class="checkbox-container">
						<input
							type="checkbox"
							id="type-traditional"
							name="type"
							value="традиционный"
							onChange={handlePizzaChange}
						/>
						<label htmlFor="type-traditional">Традиционный</label>
					</div>
					<div class="checkbox-container">
						<input
							type="checkbox"
							id="type-thin"
							name="type"
							value="тонкое"
							onChange={handlePizzaChange}
						/>
						<label htmlFor="type-thin">Тонкое</label>
					</div>
					<label htmlFor="pizza-image">Загрузить картинку:</label>
					<input
						type="file"
						id="pizza-image"
						name="image"
						accept="image/*"
						onChange={handlePizzaChange}
						required
					/>
					<div className="submit-div">
						<input
							type="submit"
							value="Добавить пиццу"
						/>
					</div>
				</form>
			</div>

			<div id="preview-block">
				<h2>Предпросмотр изображения</h2>
				{previewImage && (
					<img
						src={previewImage}
						alt="Предпросмотр изображения"
					/>
				)}
			</div>
		</>
	);
}
