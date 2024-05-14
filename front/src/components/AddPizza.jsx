import React from "react";
import axios from "axios";

export default function AddPizza() {
	const [previewImage, setPreviewImage] = React.useState("");
	// const [imageName, setImageName] = React.useState("");
	const [pizzaData, setPizzaData] = React.useState({
		name: "",
		sizes: [],
		type: [],
		price: "",
		image: null,
		imageURL: "",
		rating: "",
		category: "",
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
			setPizzaData({ ...pizzaData, [name]: file, imageURL: "" });
			// setImageName(file.name); // Сохранение имени файла
		} else if (name === "imageURL") {
			setPizzaData({ ...pizzaData, [name]: value, image: null });
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
		formData.append("rating", pizzaData.rating);
		formData.append("category", pizzaData.category);
		if (pizzaData.image) {
			formData.append("image", pizzaData.image);
		} else {
			formData.append("imageURL", pizzaData.imageURL);
		}
		pizzaData.sizes.forEach((size) => formData.append("sizes", size));
		pizzaData.type.forEach((type) => formData.append("type", type));

		// Отправляем данные на сервер с помощью Axios
		try {
			const response = await axios.post("http://localhost:5000/addItemAdmin", formData, {
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
			imageURL: "",
			rating: "",
			category: "",
		});
		setPreviewImage("");
		// setImageName("");
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
					<label htmlFor="pizza-rating">Рейтинг пиццы (от 0 до 10):</label>
					<input
						type="number"
						id="pizza-rating"
						name="rating"
						value={pizzaData.rating}
						onChange={handlePizzaChange}
						min="0"
						max="10"
						required
					/>
					<label htmlFor="pizza-category">Категория пиццы (от 0 до 5):</label>
					<input
						type="number"
						id="pizza-category"
						name="category"
						value={pizzaData.category}
						onChange={handlePizzaChange}
						min="0"
						max="5"
						required
					/>
					<label htmlFor="pizza-type">Тип пиццы:</label>
					<br />
					<div className="checkbox-container">
						<input
							type="checkbox"
							id="type-traditional"
							name="type"
							value="традиционный"
							onChange={handlePizzaChange}
						/>
						<label htmlFor="type-traditional">Традиционный</label>
					</div>
					<div className="checkbox-container">
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
					<label htmlFor="pizza-image-url">Или введите ссылку на изображение:</label>
					<input
						type="text"
						id="pizza-image-url"
						name="imageURL"
						value={pizzaData.imageURL}
						onChange={handlePizzaChange}
					/>
					{previewImage && (
						<img
							src={previewImage}
							alt="Preview"
							style={{ width: "100px", height: "100px" }}
						/>
					)}
					<div className="submit-div">
						<input
							type="submit"
							value="Добавить пиццу"
						/>
					</div>
				</form>
			</div>
		</>
	);
}
