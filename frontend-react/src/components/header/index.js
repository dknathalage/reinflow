import React from 'react';

import { Layout, Menu } from 'antd';
import {
	PieChartOutlined,
	UserOutlined,
	LockOutlined,
	ControlOutlined,
	CoffeeOutlined,
	ExportOutlined,
	VideoCameraAddOutlined,
	BulbOutlined
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { logout } from '../../redux/actions/user';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../assets/REINFLOW.png';
import Avatar from 'antd/lib/avatar/avatar';
import { openNotificationWithIcon } from '../notification';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function Headers({ isLoading }) {
	const user = useSelector((state) => state.user);
	const dir = useSelector((state) => state.dir);
	const dispatch = useDispatch();
	console.log(isLoading);
	const handleUserLogout = (e) => {
		dispatch(logout());
		openNotificationWithIcon('success', 'Logout Manager', 'You are now logged out!');
	};

	return user.auth_status === true ? (
		<div>
			<Header style={{ position: 'fixed', zIndex: 10, width: '100%', marginLeft: '-50px' }}>
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ '1' ]}>
					<Menu.Item
						key="1"
						icon={<Avatar size={45} icon={<UserOutlined style={{ fontSize: 45 }} />} />}
						style={{ width: '200px' }}
					>
						<strong style={{ padding: '10px' }}>{user.username}</strong>
					</Menu.Item>
				</Menu>
			</Header>

			<Sider
				style={{
					height: '100vh',
					width: '20px',
					marginTop: '50px',
					position: 'fixed',
					left: 0,
					overflow: 'auto'
				}}
			>
				<Menu theme="dark" mode="inline" style={{ marginTop: '20px' }}>
					<Menu.Item
						key="1"
						icon={
							<ControlOutlined
								style={{
									fontSize: '25px'
								}}
							/>
						}
						style={{
							marginBottom: '10px',
							padding: '10px',
							height: '60px'
						}}
					>
						<NavLink to="/">
							<strong>Home</strong>
						</NavLink>
					</Menu.Item>
					<Menu.Item
						key="4"
						icon={<CoffeeOutlined style={{ fontSize: '25px', marginBottom: '10px' }} />}
						style={{
							marginBottom: '10px',
							padding: '10px',
							height: '60px'
						}}
					>
						<NavLink to="/user-dashboard">
							<strong>User Dashboard</strong>
						</NavLink>
					</Menu.Item>
					{user.accesslevel === 3 ? (
						<Menu.Item
							key="5"
							icon={<LockOutlined style={{ fontSize: '25px' }} />}
							style={{
								marginBottom: '10px',
								padding: '10px',
								height: '60px'
							}}
						>
							<NavLink to="/admin-dashboard">
								<strong>Admin</strong>
							</NavLink>
						</Menu.Item>
					) : (
						''
					)}
					{user.accesslevel === 3 ? (
						<SubMenu
							key="sub1"
							icon={<UserOutlined style={{ fontSize: '25px' }} />}
							title={<strong>Management</strong>}
						>
							<Menu.Item
								key="6"
								icon={<VideoCameraAddOutlined style={{ fontSize: '25px' }} />}
								style={{
									marginBottom: '10px',
									padding: '10px',
									height: '60px'
								}}
							>
								<NavLink to="/management-sensors">
									<strong>Sensors</strong>
								</NavLink>
							</Menu.Item>

							<Menu.Item
								key="7"
								icon={<BulbOutlined style={{ fontSize: '25px' }} />}
								style={{
									marginBottom: '10px',
									padding: '10px',
									height: '60px'
								}}
							>
								<NavLink to="/management-lights">
									<strong>Lights</strong>
								</NavLink>
							</Menu.Item>
						</SubMenu>
					) : (
						''
					)}
					<Menu.Item
						key="99"
						onClick={handleUserLogout}
						icon={<ExportOutlined style={{ fontSize: '25px' }} />}
						style={{
							marginBottom: '10px',
							padding: '10px',
							height: '60px'
						}}
					>
						<NavLink to="/login">
							<strong>Sign out</strong>
						</NavLink>
					</Menu.Item>
				</Menu>
			</Sider>
		</div>
	) : (
		<div>
			<Header style={{ position: 'fixed', zIndex: 2, width: '100%', marginLeft: '-50px' }}>
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ '1' ]}>
					<Menu.Item key="1" style={{ width: '19vh' }}>
						<strong />
					</Menu.Item>
				</Menu>
			</Header>
			<Sider
				style={{
					height: '100vh',
					width: '20px',
					marginTop: '50px',
					position: 'fixed',
					left: 0,
					overflow: 'auto'
				}}
			>
				<Menu theme="dark" defaultSelectedKeys={[ '1' ]} mode="inline" style={{ marginTop: '60px' }}>
					<Menu.Item
						key="1"
						icon={<PieChartOutlined style={{ fontSize: '25px' }} />}
						style={{
							marginBottom: '10px',
							padding: '10px',
							height: '60px'
						}}
					>
						<strong>REINFLOW</strong>
					</Menu.Item>
				</Menu>
			</Sider>
		</div>
	);
}

export default Headers;
