import React from "react";
import "./AdminPanel.scss";
import axios from "axios";
import EditProfle from "../../components/EditProfle";
import AddPizza from "../../components/AddPizza";
import EditPizza from "../../components/EditPizza";
import { Navigate } from "react-router-dom";
import EditProfile from "../../components/EditProfle";

export default function AdminPanel() {
	// Состояния для данных о пользователях и новой пиццы
	const [activeSection, setActiveSection] = React.useState("");
	const [users, setUsers] = React.useState([]);
	const [pizzas, setPizzas] = React.useState([]);
	const [user, setUser] = React.useState("");

	React.useEffect(() => {
		const token = localStorage.getItem("token");
		Promise.all([
			axios.get("http://localhost:5000/get_user", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			axios.get("http://localhost:5000/users"),
			axios.get("http://localhost:5000/pizzas"),
		])
			.then(([userResponse, usersResponse, pizzasResponse]) => {
				setUsers(usersResponse.data);
				setPizzas(pizzasResponse.data);
				setUser(userResponse.data.is_admin);
				console.log(userResponse.data.is_admin);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);
	// console.log(user);
	return (
		<>
			{user !== "" && // Проверяем, определено ли значение user
				(user && user === "true" ? (
					<div className="container">
						<h3 className="adminTitle">Администрационная панель</h3>
						<div className="buttons">
							<button onClick={() => setActiveSection("users")}>Управление пользователями</button>
							<button onClick={() => setActiveSection("addPizza")}>Добавление пицц</button>
							<button onClick={() => setActiveSection("editPizza")}>Изменение товара</button>
						</div>
						{activeSection === "users" && <EditProfile users={users} />}
						{activeSection === "addPizza" && <AddPizza />}
						{activeSection === "editPizza" && <EditPizza allpizza={pizzas} />}
					</div>
				) : (
					<Navigate to="/" />
				))}
		</>
	);
}
