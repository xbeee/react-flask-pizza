import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import RequireGuest from "../../components/RequireGuest";
import useToken from "../../hooks/useToken";

export default function Login() {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const { setToken } = useToken();
	const [focusedInput, setFocusedInput] = useState(null);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleInputFocus = (inputName) => {
		setFocusedInput(inputName);
	};

	const handleInputBlur = () => {
		setFocusedInput(null);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:5000/login", formData)
			.then((response) => {
				// console.log(response.data); // Обработка успешного входа
				setToken(response.data.access_token);
				localStorage.setItem("name", formData.email);
				window.location.href = "/";
			})
			.catch((error) => {
				console.error("Ошибка входа:", error);
			});
	};

	return (
		<RequireGuest>
			<div className={styles.container}>
				<h2>Авторизация</h2>
				<form onSubmit={handleSubmit}>
					<div className={styles.formGroup}>
						<label
							htmlFor="username"
							className={focusedInput === "username" ? styles.labelActive : ""}
						>
							Логин
						</label>
						<div className={styles.inputContainer}>
							<FontAwesomeIcon
								icon={faUser}
								className={styles.inputIcon}
							/>
							<input
								type="text"
								className={styles.formControl_login}
								id="username"
								name="username"
								value={formData.username}
								onChange={handleChange}
								onFocus={() => handleInputFocus("username")}
								onBlur={handleInputBlur}
								required
							/>
						</div>
					</div>
					<div className={styles.formGroup}>
						<label
							htmlFor="password"
							className={focusedInput === "password" ? styles.labelActive : ""}
						>
							Пароль
						</label>
						<div className={styles.inputContainer}>
							<FontAwesomeIcon
								icon={faLock}
								className={styles.inputIcon}
							/>
							<input
								type="password"
								className={styles.formControl_login}
								id="password"
								name="password"
								value={formData.password}
								onChange={handleChange}
								onFocus={() => handleInputFocus("password")}
								onBlur={handleInputBlur}
								required
							/>
						</div>
					</div>
					<button
						type="submit"
						className={styles.btnPrimary}
					>
						Войти
					</button>
				</form>
				<div className={styles.registerLink}>
					Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
				</div>
			</div>
		</RequireGuest>
	);
}
