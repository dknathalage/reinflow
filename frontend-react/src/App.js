import React from 'react';
import logo from './assets/REINFLOW.png';
import './App.css';
import AdminHome from './components/pages/home';
import Error from './components/404';
import Dashboard from './components/pages/dashboard';
import UserLogin from './components/pages/login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route path="/" exact component={AdminHome} />
					<Route path="/dashboard" exact component={Dashboard} />
					<Route path="/login" exact component={UserLogin} />
					<Route component={Error} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
