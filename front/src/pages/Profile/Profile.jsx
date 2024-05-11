import React, { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import styles from "./Profile.module.scss";
import placeholderImage from "../../assets/img/profile.png";

export default function Profile() {
	const [userData, setUserData] = useState({
		Fsp: "",
		email: "",
		number: "",
	});
	const [initialUserData, setinitialUserData] = useState({
		Fsp: "",
		email: "",
		number: "",
	});

	const [isEditing, setIsEditing] = useState(false);
	const [edited, setEdited] = useState(false);
	const [loading, setLoading] = useState(true);
	const [errors, setErrors] = useState({});

	React.useEffect(() => {
		// Получение данных пользователя при монтировании компонента
		const token = localStorage.getItem("token");

		axios
			.get("http://localhost:5000/getUser", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setUserData(response.data);
				setinitialUserData(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Ошибка при получении данных пользователя:", error);
			});
	}, []);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
		setErrors({ ...errors, [name]: "" });
		setEdited(true);
	};

	const validateFields = () => {
		let valid = true;
		const newErrors = {};

		// Проверка наличия значений
		Object.keys(userData).forEach((key) => {
			if (!userData[key]) {
				newErrors[key] = "Поле не может быть пустым";
				valid = false;
			}
		});

		setErrors(newErrors);
		return valid;
	};

	const handleSave = () => {
		if (validateFields()) {
			// Проверяем, изменились ли данные
			const isDataChanged = userData.Fsp !== initialUserData.Fsp || userData.email !== initialUserData.email || userData.number !== initialUserData.number;

			if (isDataChanged) {
				// Создаем новый объект только с измененными данными
				const changedData = {};

				if (userData.Fsp !== initialUserData.Fsp) {
					changedData.Fsp = userData.Fsp;
				}
				if (userData.email !== initialUserData.email) {
					changedData.email = userData.email;
				}
				if (userData.number !== initialUserData.number) {
					changedData.number = userData.number;
				}
				console.log(changedData);

				axios
					.post("http://localhost:5000/editUser", changedData, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					})
					.then((response) => {
						console.log(response.data);
						setIsEditing(false);
						setEdited(true);
						if (userData.email !== localStorage.getItem("name")) {
							localStorage.setItem("name", userData.email);
							if (response.data.token) {
								localStorage.setItem("token", response.data.token);
							}
						}
					})
					.catch((error) => {
						console.error("Ошибка при обновлении данных:", error);
						if (error.response && error.response.data && error.response.data.error) {
							setErrors({ ...errors, ...error.response.data.error });
						}
					});
			} else {
				// Если данные не изменились, просто завершаем редактирование
				setIsEditing(false);
			}
		}
	};

	const handleLogout = async () => {
		try {
			const req = await axios({
				method: "POST",
				url: "http://127.0.0.1:5000/logout",
			});
			console.log(req.data);
			localStorage.removeItem("name");
			localStorage.removeItem("token");
			alert("Выход прошло успешно");
			Navigate("/");
		} catch (error) {
			alert("Ошибка при выходе из аккаунта, повторите попытку");
			console.log(error.response);
		}
	};
	return (
		<>
			{!loading ? (
				<div className={styles.container}>
					<h2>Личный кабинет</h2>
					<img
						src={placeholderImage}
						alt="Placeholder"
						className={styles.profileImage}
					/>
					<div className={styles.userInfo}>
						<div>
							<p>
								<strong>Имя:</strong>{" "}
								{isEditing ? (
									<input
										type="text"
										name="Fsp"
										value={userData.Fsp}
										onChange={handleChange}
									/>
								) : (
									userData.Fsp
								)}
							</p>
							{errors.name && <p className={styles.error}>{errors.name}</p>}
							<p>
								<strong>Email:</strong>{" "}
								{isEditing ? (
									<input
										type="email"
										name="email"
										value={userData.email}
										onChange={handleChange}
									/>
								) : (
									userData.email
								)}
							</p>
							{errors.email && <p className={styles.error}>{errors.email}</p>}
							<p>
								<strong>Телефон:</strong>{" "}
								{isEditing ? (
									<input
										type="tel"
										name="number"
										value={userData.number}
										onChange={handleChange}
									/>
								) : (
									userData.number
								)}
							</p>
							{errors.phone && <p className={styles.error}>{errors.phone}</p>}
						</div>
					</div>
					{!isEditing ? (
						<button
							onClick={() => setIsEditing(true)}
							className={styles.btnPrimary}
						>
							Редактировать
						</button>
					) : (
						<div className={styles.btnBlocks}>
							<button
								onClick={handleSave}
								className={`${styles.btnPrimary} ${!edited && styles.disabled}`}
								disabled={!edited}
							>
								Сохранить
							</button>
							<button
								onClick={() => setIsEditing(false)}
								className={`${styles.btnPrimary}`}
							>
								Отмена
							</button>
						</div>
					)}
					<Link
						to="/orders"
						className={styles.btnSecondary}
					>
						Мои заказы
					</Link>
					<button
						onClick={handleLogout}
						className={styles.btnLogout}
					>
						Выйти
					</button>
					{edited ? <p className={styles.edited}>Данные изменены</p> : ""}
				</div>
			) : (
				<div className={styles.loaderContainer}>
					<span className={styles.loader}></span>
				</div>
			)}
		</>
	);
}
