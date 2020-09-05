import React from 'react';
import { Layout, Menu, Breadcrumb, PageHeader } from 'antd';
import { UserOutlined, AlertOutlined, CameraOutlined } from '@ant-design/icons';
import ReinFlowFooter from '../../footer/footer';
import Headers from '../../header';
import { useState } from 'react';
import UserManagement from './components/UserManagement';
import Traffic_Stats from './components/traffic_stats';
import Sensor_Stats from './components/sensor_stats';
import { useSelector } from 'react-redux';
const { Header, Content } = Layout;
const { SubMenu } = Menu;
function AdminDashboard() {
	const user = useSelector((state) => state.user);
	const [ viewPort, setviewPort ] = useState(<Sensor_Stats />);
	const [ viewPortItem, setviewPortItem ] = useState(null);
	const handleClick = (e) => {
		const key = e.key;
		switch (key) {
			case '1':
				setviewPort(<Sensor_Stats />);
				setviewPortItem(null);
				break;
			case '2':
				setviewPort(<Traffic_Stats />);
				setviewPortItem(null);
				break;
			case '3':
				setviewPort(<UserManagement />);
				setviewPortItem(3);
				break;
		}
	};

	return (
		<React.Fragment>
			<Headers />
			<Layout className="site-layout" style={{ marginLeft: 200, minHeight: '100vh' }}>
				<Header
					className="site-layout-background"
					style={{ padding: 0, width: '100%', background: 'black', zIndex: 10, position: 'fixed' }}
				/>
				<Content style={{ margin: '90px 16px 0', overflow: 'initial' }}>
					<PageHeader
						style={{ border: '5px solid #dddddd' }}
						title={`Welcome ${user.username},`}
						subTitle={`Admin Dashboard`}
					/>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Admin</Breadcrumb.Item>
						<Breadcrumb.Item>Management</Breadcrumb.Item>
					</Breadcrumb>
					<br />
					<div className="site-layout-background" style={{ zIndex: 1, display: 'flex' }}>
						<div>
							<Menu style={{ width: 256 }} defaultSelectedKeys={[ '1' ]} defaultOpenKeys={[ 'sub1' ]}>
								<Menu.Item
									key="1"
									icon={<CameraOutlined style={{ fontSize: '25px', color: 'orange' }} />}
									onClick={handleClick}
									style={{
										marginBottom: '10px',
										padding: '10px',
										height: '60px'
									}}
								>
									<strong>Sensor Statistics</strong>
								</Menu.Item>
								<Menu.Item
									key="2"
									icon={<AlertOutlined style={{ fontSize: '25px', color: 'red' }} />}
									onClick={handleClick}
									style={{
										marginBottom: '10px',
										padding: '10px',
										height: '60px'
									}}
								>
									<strong>Traffic Light Statistics</strong>
								</Menu.Item>
								<Menu.Item
									key="3"
									icon={<UserOutlined style={{ fontSize: '25px', color: 'green' }} />}
									onClick={handleClick}
									style={{
										marginBottom: '10px',
										padding: '10px',
										height: '60px'
									}}
								>
									<strong>User Management</strong>
								</Menu.Item>
							</Menu>
						</div>
						<div style={{ padding: '20px', width: '100%' }}>{viewPort}</div>
					</div>
					<br />
					{viewPortItem === 3 ? (
						<div className="site-layout-background" style={{ padding: 24, textAlign: 'center', zIndex: 1 }}>
							<h1>USER MANAGEMENT</h1>
							<h3>SOME MANAGEMENT MODULE HERE</h3>
						</div>
					) : (
						''
					)}
				</Content>
				<ReinFlowFooter />
			</Layout>
		</React.Fragment>
	);
}

export default AdminDashboard;
