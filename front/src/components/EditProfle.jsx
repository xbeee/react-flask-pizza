import React from "react";

export default function EditProfle() {
	return (
		<div id="users-block">
			<h2>Пользователи</h2>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>ФИО</th>
						<th>Email</th>
						<th>Телефон</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Иванов Иван Иванович</td>
						<td>ivanov@example.com</td>
						<td>+123456789</td>
						<td>
							<button className="delete-btn">Удалить</button>
						</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Петров Петр Петрович</td>
						<td>petrov@example.com</td>
						<td>+987654321</td>
						<td>
							<button className="delete-btn">Удалить</button>
						</td>
					</tr>
					<tr>
						<td>3</td>
						<td>Сидоров Сидор Сидорович</td>
						<td>sidorov@example.com</td>
						<td>+555555555</td>
						<td>
							<button className="delete-btn">Удалить</button>
						</td>
					</tr>
					<tr>
						<td>4</td>
						<td>Александров Александр Александрович</td>
						<td>alexandrov@example.com</td>
						<td>+444444444</td>
						<td>
							<button className="delete-btn">Удалить</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
