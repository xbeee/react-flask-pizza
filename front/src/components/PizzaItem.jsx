// import React, { useState } from "react";
// import classNames from "classnames";
// import axios from "axios";
// import Button from "./Button";

// export default function PizzaItem({ id, name, imageURL, price, types, sizes }) {
// 	console.log(types);
// 	console.log(sizes);
// 	const availableTypes = ["тонкое", "традиционное"];
// 	const availableSizes = [26, 30, 40];

// 	const [activeType, setActiveType] = useState(0);

// 	const [activeSize, setActiveSize] = useState(0);
// 	const [quantity, setQuantity] = useState(1); // Количество пицц в корзине

// 	const onSelectType = (index) => {
// 		setActiveType(index);
// 	};

// 	const onSelectSize = (index) => {
// 		setActiveSize(index);
// 	};

// 	const handleAddToCart = async () => {
// 		try {
// 			const token = localStorage.getItem("token");
// 			const totalPrice = price * quantity;
// 			await axios.put(
// 				"http://localhost:5000/addCart",
// 				{
// 					product_id: id,
// 					quantity: quantity,
// 					product_type: activeType,
// 					product_name: name,
// 					imageURL: imageURL,
// 					price: totalPrice,
// 					product_size: availableSizes[activeSize],
// 				},
// 				{
// 					headers: {
// 						Authorization: `Bearer ${token}`,
// 					},
// 				}
// 			);
// 			// Успешно добавлено в корзину
// 			alert(`Пицца "${name}" добавлена в корзину`);
// 		} catch (error) {
// 			console.error("Ошибка при добавлении пиццы в корзину:", error);
// 			// Ошибка при добавлении в корзину
// 			alert(`Ошибка при добавлении пиццы "${name}" в корзину. Пожалуйста, повторите попытку.`);
// 		}
// 	};

// 	const incrementQuantity = () => {
// 		setQuantity(quantity + 1);
// 	};

// 	const decrementQuantity = () => {
// 		if (quantity > 1) {
// 			setQuantity(quantity - 1);
// 		}
// 	};

// 	return (
// 		<div className="pizza-block">
// 			<img
// 				className="pizza-block__image"
// 				src={imageURL}
// 				alt="Pizza"
// 			/>
// 			<h4 className="pizza-block__title">{name}</h4>
// 			<div className="pizza-block__selector">
// 				<ul>
// 					{availableTypes.map((type, index) => (
// 						<li
// 							key={type}
// 							onClick={() => onSelectType(index)}
// 							className={classNames({
// 								active: activeType === index,
// 								disabled: !types.includes(index),
// 							})}
// 						>
// 							{type}
// 						</li>
// 					))}
// 				</ul>
// 				<ul>
// 					{availableSizes.map((size, index) => (
// 						<li
// 							key={size}
// 							onClick={() => onSelectSize(index)}
// 							className={classNames({
// 								active: activeSize === index,
// 								disabled: !sizes.includes(size),
// 							})}
// 						>
// 							{size} см.
// 						</li>
// 					))}
// 				</ul>
// 			</div>
// 			<div className="pizza-block__bottom">
// 				<div className="pizza-block__price">от {price * quantity} ₽</div>
// 				<div className="pizza-block__quantity">
// 					<Button
// 						className="counter"
// 						outline
// 						onClick={decrementQuantity}
// 					>
// 						-
// 					</Button>
// 					<span className="quantity-value">{quantity}</span>
// 					<Button
// 						className="counter"
// 						outline
// 						onClick={incrementQuantity}
// 					>
// 						+
// 					</Button>
// 				</div>
// 				<Button
// 					className="button--add"
// 					onClick={handleAddToCart}
// 				>
// 					<svg
// 						width="12"
// 						height="12"
// 						viewBox="0 0 12 12"
// 						fill="none"
// 						xmlns="http://www.w3.org/2000/svg"
// 					>
// 						<path
// 							d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
// 							fill="white"
// 						/>
// 					</svg>
// 					<span>Добавить</span>
// 				</Button>
// 			</div>
// 		</div>
// 	);
// }

import React, { useState } from "react";
import classNames from "classnames";
import axios from "axios";
import Button from "./Button";

export default function PizzaItem({ id, name, imageURL, price, types, sizes }) {
	const availableTypes = ["тонкое", "традиционное"];
	const availableSizes = [26, 30, 40];

	const [activeType, setActiveType] = useState(0);
	const [activeSize, setActiveSize] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [totalPrice, setTotalPrice] = useState(price);

	const onSelectType = (index) => {
		setActiveType(index);
		updatePrice(index, activeSize);
	};

	const onSelectSize = (index) => {
		setActiveSize(index);
		updatePrice(activeType, index);
	};

	const updatePrice = (typeIndex, sizeIndex) => {
		let newPrice = 0;
		let basePrice = price; // Минимальная базовая цена

		if (typeIndex === 0) {
			// Тонкое тесто
			if (sizeIndex === 0) {
				// 26 см
				newPrice = basePrice;
			} else if (sizeIndex === 1) {
				// 30 см
				newPrice = basePrice + 70;
			} else if (sizeIndex === 2) {
				// 40 см
				newPrice = basePrice + 120;
			}
		} else if (typeIndex === 1) {
			// Традиционное тесто
			if (sizeIndex === 0) {
				// 26 см
				newPrice = basePrice + 50;
			} else if (sizeIndex === 1) {
				// 30 см
				newPrice = basePrice + 120;
			} else if (sizeIndex === 2) {
				// 40 см
				newPrice = basePrice + 150;
			}
		}

		setTotalPrice(newPrice);
	};

	const incrementQuantity = () => {
		setQuantity(quantity + 1);
	};

	const decrementQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const handleAddToCart = async () => {
		try {
			const token = localStorage.getItem("token");
			const totalPriceIt = totalPrice * quantity;
			await axios.put(
				"http://localhost:5000/addCart",
				{
					product_id: id,
					quantity: quantity,
					product_type: activeType,
					product_name: name,
					imageURL: imageURL,
					price: totalPriceIt,
					product_size: availableSizes[activeSize],
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			alert(`Пицца "${name}" добавлена в корзину`);
		} catch (error) {
			console.error("Ошибка при добавлении пиццы в корзину:", error);
			alert(`Ошибка при добавлении пиццы "${name}" в корзину. Пожалуйста, повторите попытку.`);
		}
	};

	return (
		<div className="pizza-block">
			<img
				className="pizza-block__image"
				src={imageURL}
				alt="Pizza"
			/>
			<h4 className="pizza-block__title">{name}</h4>
			<div className="pizza-block__selector">
				<ul>
					{availableTypes.map((type, index) => (
						<li
							key={type}
							onClick={() => onSelectType(index)}
							className={classNames({
								active: activeType === index,
								disabled: !types.includes(index),
							})}
						>
							{type}
						</li>
					))}
				</ul>
				<ul>
					{availableSizes.map((size, index) => (
						<li
							key={size}
							onClick={() => onSelectSize(index)}
							className={classNames({
								active: activeSize === index,
								disabled: !sizes.includes(size),
							})}
						>
							{size} см.
						</li>
					))}
				</ul>
			</div>
			<div className="pizza-block__bottom">
				<div className="pizza-block__price">{totalPrice * quantity} ₽</div>
				<div className="pizza-block__quantity">
					<Button
						className="counter"
						outline
						onClick={decrementQuantity}
					>
						-
					</Button>
					<span className="quantity-value">{quantity}</span>
					<Button
						className="counter"
						outline
						onClick={incrementQuantity}
					>
						+
					</Button>
				</div>
				<Button
					className="button--add"
					onClick={handleAddToCart}
				>
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
							fill="white"
						/>
					</svg>
					<span>Добавить</span>
				</Button>
			</div>
		</div>
	);
}
