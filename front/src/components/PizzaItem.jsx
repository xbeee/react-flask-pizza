import React, { useState } from "react";
import classNames from "classnames";
import axios from "axios";
import Button from "./Button";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function PizzaItem({ id, name, imageURL, price, types, sizes, pizzaCart }) {
	const availableTypes = ["тонкое", "традиционное"];
	const availableSizes = React.useMemo(() => [26, 30, 40], []);
	const [activeType, setActiveType] = useState(null);
	const [activeTypeSecond, setActiveTypeSecond] = useState(types);
	const [activeSize, setActiveSize] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [totalPrice, setTotalPrice] = useState(price);
	const [isInCart, setIsInCart] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [error, setError] = useState(false);
	const [loggedError, setLoggedError] = useState(false);

	const onSelectType = (index) => {
		setActiveType(index);
		setActiveTypeSecond(index);
		updatePrice(index, activeSize);
	};

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	const onSelectSize = (index) => {
		setActiveSize(index);
		updatePrice(activeType, index);
	};

	const updatePrice = (typeIndex, sizeIndex) => {
		if (sizeIndex !== null) {
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
		}
	};

	const incrementQuantity = () => {
		if (activeType !== null && activeSize !== null) {
			setQuantity(quantity + 1);
		} else {
			setError(true); // Вызываем ошибку, если тип и размер не выбраны
		}
	};

	const decrementQuantity = () => {
		if (quantity > 1) {
			if (activeType !== null && activeSize !== null) {
				setQuantity(quantity - 1);
			} else {
				setError(true); // Вызываем ошибку, если тип и размер не выбраны
			}
		}
	};
	const handleAddToCart = async () => {
		if (activeSize !== null) {
			try {
				const token = localStorage.getItem("token");
				const totalPriceIt = totalPrice * quantity;
				// setCartTotal({ quantity: quantity, totalPrice: totalPriceIt });
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
				// alert(`Пицца "${name}" добавлена в корзину`);
				setSnackbarMessage(`Пицца "${name}" добавлена в корзину`); // Устанавливаем сообщение для Snackbar
				setSnackbarOpen(true);
				setIsInCart(true);
			} catch (error) {
				console.error("Ошибка при добавлении пиццы в корзину:", error);
				setSnackbarMessage(`Ошибка при добавлении пиццы "${name}" в корзину. Пожалуйсста, авторизуйтесь.`); // Устанавливаем сообщение об ошибке для Snackbar
				setSnackbarOpen(true);
			}
		} else {
			// alert("Пожалуйста, выберите тип и размер пиццы.");
			setError(true);
			setLoggedError(true);
		}
	};
	React.useEffect(() => {
		setIsInCart(pizzaCart.some((item) => item.product_name === name && item.product_type === activeType && item.product_size === availableSizes[activeSize]));
		console.log(isInCart);
	}, [activeSize, activeType, availableSizes, isInCart, name, pizzaCart]);
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
								active: activeTypeSecond === index,
								disabled: activeTypeSecond !== null && !types.includes(index),
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
				{!isInCart ? (
					<>
						<div className="pizza-block__price">{activeSize !== null && activeType !== null ? totalPrice * quantity : `От ${price}`}₽</div>
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
							// disabled={activeType === null || activeSize === null}
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
					</>
				) : (
					<Button className="button--added">
						<Link
							to="/cart"
							className="link"
						>
							<svg
								width="25"
								height="23"
								viewBox="0 0 18 18"
								fill="#f24701"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
									stroke="#f24701"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
									stroke="#f24701"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
									stroke="#f24701"
									strokeWidth="1.8"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span>В корзине</span>
						</Link>
					</Button>
				)}
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
					severity="success"
				>
					Пицца "{name}" добавлена в корзину
				</MuiAlert>
			</Snackbar>
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={2000}
				onClose={handleSnackbarClose}
			>
				<MuiAlert
					elevation={6}
					variant="filled"
					onClose={handleSnackbarClose}
					severity="success"
				>
					{snackbarMessage}
				</MuiAlert>
			</Snackbar>
			<Snackbar
				open={error}
				autoHideDuration={1500} // Время, через которое Snackbar исчезнет (мс)
				onClose={() => setError(false)} // Обработчик закрытия Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Позиция Snackbar
			>
				<MuiAlert
					elevation={6}
					variant="filled"
					severity="error"
					onClose={() => setError(false)} // Обработчик закрытия Alert
				>
					Сначала выберите тип и размер пиццы
				</MuiAlert>
			</Snackbar>
			<Snackbar
				open={loggedError}
				autoHideDuration={1500} // Время, через которое Snackbar исчезнет (мс)
				onClose={() => setLoggedError(false)} // Обработчик закрытия Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Позиция Snackbar
			>
				<MuiAlert
					elevation={6}
					variant="filled"
					severity="error"
					onClose={() => setLoggedError(false)} // Обработчик закрытия Alert
				>
					Пожалуйста, авторизуйтесь
				</MuiAlert>
			</Snackbar>
		</div>
	);
}
