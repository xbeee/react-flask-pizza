// Categories.js
import React from "react";

export default function Categories({ activeCategory, onCategoryClick }) {
	const categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"];

	return (
		<div className="categories">
			<ul>
				{categories.map((category, index) => (
					<li
						key={`${category}_${index}`}
						className={activeCategory === index ? "active" : ""}
						onClick={() => onCategoryClick(index)}
					>
						{category}
					</li>
				))}
			</ul>
		</div>
	);
}
