import React from 'react';

import { Layout, Menu, Breadcrumb, Badge } from 'antd';
import {
	DesktopOutlined,
	PieChartOutlined,
	FileOutlined,
	TeamOutlined,
	UserOutlined,
	LockOutlined
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/actions/user';
import { useSelector, useDispatch } from 'react-redux';
import { set_directory } from '../../redux/actions/directory';
import logo from '../../assets/REINFLOW.png';
import Avatar from 'antd/lib/avatar/avatar';
import { openNotificationWithIcon } from '../notification';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Headers() {
	const user = useSelector((state) => state.user);
	const dir = useSelector((state) => state.dir);
	const dispatch = useDispatch();

	const handleOnClick = (e) => {
		dispatch(
			set_directory({
				current_dir: 'Home',
				dir_key: 1,
				sider_key: null
			})
		);
	};

	const handleOnClick2 = (e) => {
		dispatch(
			set_directory({
				current_dir: 'Admin',
				dir_key: 2,
				sider_key: null
			})
		);
	};

	const handleUserDashboard = (e) => {
		dispatch(
			set_directory({
				current_dir: 'User/Dashboard',
				dir_key: 1,
				sider_key: 4
			})
		);
	};

	const handleUserLogout = (e) => {
		dispatch(logout());
		openNotificationWithIcon('success', 'Logout Manager', 'You are now logged out!');
	};

	return user.auth_status === true ? (
		<div>
			<Header style={{ position: 'fixed', zIndex: 1, width: '100%', marginLeft: '150px' }}>
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ `${dir.dir_key}` ]}>
					<Menu.Item key="1" onClick={handleOnClick}>
						<NavLink to="/">Home</NavLink>
					</Menu.Item>
					<Menu.Item key="2" onClick={handleOnClick2}>
						<NavLink to="/dashboard">Admin</NavLink>
					</Menu.Item>
					<Menu.Item key="3">
						<NavLink to="/stats">Statistics</NavLink>
					</Menu.Item>
				</Menu>
			</Header>
			<Sider style={{ minHeight: '100vh' }}>
				<div className="logo" />
				<Menu
					theme="dark"
					defaultSelectedKeys={[ `${dir.sider_key}` ]}
					mode="inline"
					style={{ marginTop: '70px' }}
				>
					<SubMenu
						key="1"
						icon={<Avatar size="small" icon={<UserOutlined />} />}
						title={
							<span style={{ color: 'white', fontWeight: 'bolder', padding: '10px' }}>
								{user.username}
							</span>
						}
					>
						<Menu.Item key="4" onClick={handleUserDashboard}>
							<NavLink to="/user-dashboard">User Dashboard</NavLink>
						</Menu.Item>
						<Menu.Item key="5" onClick={handleUserLogout} icon={<LockOutlined />}>
							<NavLink to="/login">Sign out</NavLink>
						</Menu.Item>
					</SubMenu>
					<Menu.Item key="2" icon={<DesktopOutlined />}>
						Option 2
					</Menu.Item>
					<SubMenu key="sub1" icon={<UserOutlined />} title="Predictions">
						<Menu.Item key="3">Something here</Menu.Item>
					</SubMenu>
					<SubMenu key="sub2" icon={<TeamOutlined />} title="Sensors">
						<Menu.Item key="5">Sensor 1</Menu.Item>
						<Menu.Item key="6">Sensor 2</Menu.Item>
					</SubMenu>
					<Menu.Item key="5" onClick={handleUserLogout} icon={<LockOutlined />}>
						<NavLink to="/login">Sign out</NavLink>
					</Menu.Item>
				</Menu>
			</Sider>
		</div>
	) : (
		<div>
			<Header style={{ position: 'fixed', zIndex: 1, width: '100%', marginLeft: '150px' }}>
				<div className="logo" />
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ '1' ]}>
					<Menu.Item key="1">
						<NavLink to="/">Home</NavLink>
					</Menu.Item>
				</Menu>
			</Header>
			<Sider style={{ height: '100vh' }}>
				<div className="logo" />
				<Menu theme="dark" defaultSelectedKeys={[ '1' ]} mode="inline" style={{ marginTop: '60px' }}>
					<Menu.Item key="1" icon={<PieChartOutlined />}>
						Overview
					</Menu.Item>
				</Menu>
			</Sider>
		</div>
	);
}

export default Headers;
