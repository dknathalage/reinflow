import React from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Headers() {
	const user = useSelector((state) => state.user);

	return user.auth_status === true ? (
		<div>
			<Header style={{ position: 'fixed', zIndex: 1, width: '100%', marginLeft: '150px' }}>
				<div className="logo" />
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={[ '1' ]}>
					<Menu.Item key="1">
						<NavLink to="/">Home</NavLink>
					</Menu.Item>
					<Menu.Item key="2">
						<NavLink to="/dashboard">Admin</NavLink>
					</Menu.Item>
					<Menu.Item key="3">
						<NavLink to="/stats">Statistics</NavLink>
					</Menu.Item>
				</Menu>
			</Header>
			<Sider collapsible style={{ minHeight: '100vh' }}>
				<div className="logo" />
				<Menu theme="dark" defaultSelectedKeys={[ '1' ]} mode="inline" style={{ marginTop: '60px' }}>
					<Menu.Item key="1" icon={<PieChartOutlined />}>
						Overview
					</Menu.Item>
					<Menu.Item key="2" icon={<DesktopOutlined />}>
						Option 2
					</Menu.Item>
					<SubMenu key="sub1" icon={<UserOutlined />} title="Predictions">
						<Menu.Item key="3">Something here</Menu.Item>
					</SubMenu>
					<SubMenu key="sub2" icon={<TeamOutlined />} title="Sensors">
						<Menu.Item key="4">Sensor 1</Menu.Item>
						<Menu.Item key="5">Sensor 2</Menu.Item>
					</SubMenu>
					<Menu.Item key="9" icon={<FileOutlined />} />
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
			<Sider collapsible style={{ minHeight: '100vh' }}>
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
