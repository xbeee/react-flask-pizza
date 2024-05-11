import React from "react";
import "./AdminPanel.scss";
import axios from "axios";
import EditProfle from "../../components/EditProfle";
import AddPizza from "../../components/AddPizza";
import EditPizza from "../../components/EditPizza";

export default function AdminPanel() {
	// Состояния для данных о пользователях и новой пиццы
	const [users, setUsers] = React.useState([]);
	const [pizza, setPizza] = React.useState([]);

	return (
		<div className="container">
			<EditProfle />

			<AddPizza />
			<EditPizza />
		</div>
	);
}
