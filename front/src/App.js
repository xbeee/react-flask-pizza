import { Route, Routes } from "react-router-dom";
import React from "react";
import Header from "./components/Header";
import "./scss/app.scss";
import Main from "./pages/Main";
import AppContext from "./context";
import Login from "./pages/Login/Login";
import Register from "./pages/Regsiter/Register";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart";
import AdminPanel from "./pages/AdminPanel/AdminPanel";

function App() {
	const [userToken, setUserToken] = React.useState(null);
	React.useEffect(() => {
		async function getToken() {
			setUserToken(localStorage.getItem("token"));
		}
		getToken();
	});
	return (
		<div className="App">
			<div className="wrapper">
				<AppContext.Provider value={{ userToken }}>
					<Header />
					<div className="content">
						<Routes>
							<Route
								path="/"
								element={<Main />}
							/>
							<Route
								path="/login"
								element={<Login />}
							/>
							<Route
								path="/register"
								element={<Register />}
							/>
							<Route
								path="/profile"
								element={<Profile />}
							/>
							<Route
								path="/cart"
								element={<Cart />}
							/>
							<Route
								path="/admin"
								element={<AdminPanel />}
							/>
						</Routes>
					</div>
				</AppContext.Provider>
			</div>
		</div>
	);
}

export default App;
