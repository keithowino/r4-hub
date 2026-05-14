import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import { DataProvider } from "./lib/context/DataContext";
import { ToastContainer } from "react-toastify";

const App = () => {
	const AuthenticatedApp = () => {
		return (
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
				</Route>
			</Routes>
		);
	};

	return (
		<DataProvider>
			<HelmetProvider>
				<Router>
					<AuthenticatedApp />
				</Router>
			</HelmetProvider>
			<ToastContainer />
		</DataProvider>
	);
};

export default App;
