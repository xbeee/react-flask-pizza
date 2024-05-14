import React from "react";
import "./PizzaInfo.css"; // Подключаем файл со стилями
import { FaCheckCircle, FaUtensils, FaUserFriends, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const PizzaInfo = () => {
	return (
		<div className="container">
			<div className="pizza-info">
				<h1 className="pizza-info__title">Добро пожаловать в React Pizza!</h1>
				<p className="pizza-info__description">
					Мы рады приветствовать вас в нашей пиццерии React Pizza. Здесь вы найдете самые вкусные и качественные пиццы, приготовленные с любовью и из лучших ингредиентов.
				</p>
				<p className="pizza-info__pickup-only">Пожалуйста, обратите внимание, что в настоящее время доступен только самовывоз пиццы. Доставка пока что недоступна.</p>
				<div className="pizza-info__highlights">
					<h2 className="pizza-info__highlight-title">Почему React Pizza такая классная пиццерия:</h2>
					<ul className="pizza-info__highlight-list">
						<li className="pizza-info__highlight-item">
							<FaUtensils
								className="icon"
								size={30}
							/>{" "}
							Широкий выбор вкусных пицц
						</li>
						<li className="pizza-info__highlight-item">
							<FaCheckCircle
								className="icon"
								size={30}
							/>{" "}
							Использование только свежих ингредиентов
						</li>
						<li className="pizza-info__highlight-item">
							<FaUserFriends
								className="icon"
								size={30}
							/>{" "}
							Уютная атмосфера и дружелюбный персонал
						</li>
						<li className="pizza-info__highlight-item">
							<FaClock
								className="icon"
								size={30}
							/>{" "}
							Быстрое и удобное оформление заказа
						</li>
					</ul>
				</div>
				<div className="pizza-info__btn">
					<Link to="/">
						<button className="button">В каталог</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PizzaInfo;
