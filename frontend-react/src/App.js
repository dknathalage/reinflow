import React, { Component, useState } from 'react';
import logo from './assets/REINFLOW.png';
import './App.css';
import AdminHome from './components/pages/home';
import Error from './components/404';
import Dashboard from './components/pages/dashboard';
import UserLogin from './components/pages/login';
import UserRegisteration from './components/pages/register';
import UserDashboard from './components/pages/sider/user_dashboard';
import SensorManagement from './components/pages/management/sensors';
import LightManagement from './components/pages/management/lights';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message, Spin, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Headers from './components/header';

function App() {
	const openNotification = () => {
		notification.open({
			message: 'Loading you in',
			description: 'Fetching your data!',
			icon: <SmileOutlined style={{ color: '#108ee9' }} />
		});
	};

	const ProtectedRoute = ({ component: Component, ...rest }) => {
		const user = useSelector((state) => state.user);
		const [ userStatus, setuserStatus ] = useState(user.auth_status);
		const [ isLoading, setisLoading ] = useState(true);

		setTimeout(() => {
			setisLoading(false);
		}, 5000);

		return isLoading === false ? (
			<Route
				{...rest}
				render={(props) => {
					if (userStatus === true) {
						return <Component {...props} />;
					} else {
						return <Redirect to="/login" />;
					}
				}}
			/>
		) : (
			<div>
				<Headers />
				{openNotification()}
			</div>
		);
	};
	return (
		<Router>
			<div>
				<Switch>
					<ProtectedRoute path="/" exact component={AdminHome} />
					<ProtectedRoute path="/dashboard" exact component={Dashboard} />
					<Route path="/login" exact component={UserLogin} />
					<Route path="/register" exact component={UserRegisteration} />
					<ProtectedRoute path="/user-dashboard" exact component={UserDashboard} />
					<ProtectedRoute path="/management-sensors" exact component={SensorManagement} />
					<ProtectedRoute path="/management-lights" exact component={LightManagement} />
					<Route component={Error} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
