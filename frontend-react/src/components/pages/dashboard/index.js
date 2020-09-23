import React from 'react';
import { Layout, Menu, Breadcrumb, PageHeader, Descriptions, Image, Button, Space } from 'antd';
import {
	UserOutlined,
	AlertOutlined,
	CameraOutlined,
	ReadOutlined,
	ControlOutlined,
	DownloadOutlined
} from '@ant-design/icons';
import ReinFlowFooter from '../../footer/footer';
import Headers from '../../header';
import { useState } from 'react';
import UserManagement from './components/UserManagement';
import Traffic_Stats from './components/traffic_stats';
import Sensor_Stats from './components/sensor_stats';
import SensorCommands from './components/sensor_stats/commands/index';
import TrafficCommands from './components/traffic_stats/commands/index';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { get_spec_user } from '../../../authentication/fetcher';
import { openNotificationWithIcon } from '../../notification';
import { promote, demote, user_accesslevels } from '../../../authentication/management';
const { Header, Content } = Layout;
const { SubMenu } = Menu;
function AdminDashboard() {
	const user = useSelector((state) => state.user);
	const userData = useSelector((state) => state.manage);
	const [ viewPort, setviewPort ] = useState(<Sensor_Stats />);
	const [ viewPortItem, setviewPortItem ] = useState(null);
	const [ userManager, setuserManager ] = useState(false);
	const handleClick = (e) => {
		const key = e.key;
		switch (key) {
			case '1':
				setviewPort(<Sensor_Stats />);
				setviewPortItem(null);
				setuserManager(false);
				break;
			case '2':
				setviewPort(<SensorCommands />);
				setviewPortItem(null);
				setuserManager(false);
				break;
			case '3':
				setviewPort(<Traffic_Stats />);
				setviewPortItem(null);
				setuserManager(false);
				break;
			case '4':
				setviewPort(<TrafficCommands />);
				setviewPortItem(null);
				setuserManager(false);
				break;
			case '5':
				setviewPort(<UserManagement />);
				setviewPortItem(3);
				setuserManager(true);
				break;
		}
	};

	const handleLevel1 = async (e) => {
		e.preventDefault();
		const id = e.target.parentElement.id;
		console.log(id);
		if (userData.accessLevel === 1) {
			openNotificationWithIcon('error', 'Platform Manager', 'User has the same accessLevel Already');
		} else {
			const data = await user_accesslevels(id, 1);
			if (data.status === true) {
				openNotificationWithIcon('success', 'Platform Manager', 'User Updated');
			} else {
				openNotificationWithIcon('error', 'Platform Manager', 'Something happened');
			}
		}
		//logic for level 1
	};

	const handleLevel2 = async (e) => {
		e.preventDefault();
		const id = e.target.parentElement.id;
		console.log(id);
		if (userData.accessLevel === 2) {
			openNotificationWithIcon('error', 'Platform Manager', 'User has the same accessLevel Already');
		} else {
			const data = await user_accesslevels(id, 2);
			if (data.status === true) {
				openNotificationWithIcon('success', 'Platform Manager', 'User Updated');
			} else {
				openNotificationWithIcon('error', 'Platform Manager', 'Something happened');
			}
		}
		//logic for level 1
	};

	const handleLevel3 = async (e) => {
		e.preventDefault();
		const id = e.target.parentElement.id;
		console.log(id);
		if (userData.accessLevel === 3) {
			openNotificationWithIcon('error', 'Platform Manager', 'User has the same accessLevel Already');
		} else {
			const data = await user_accesslevels(id, 3);
			if (data.status === true) {
				openNotificationWithIcon('success', 'Platform Manager', 'User Updated');
			} else {
				openNotificationWithIcon('error', 'Platform Manager', 'Something happened');
			}
		}
		//logic for level 1
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
							<Menu
								style={{ width: 256 }}
								defaultSelectedKeys={[ '1' ]}
								defaultOpenKeys={[ 'sub2' ]}
								mode="inline"
							>
								<SubMenu
									key="sub2"
									title={
										<span>
											<CameraOutlined style={{ fontSize: '25px', color: 'orange' }} />
											<strong>Ground Sensors</strong>
										</span>
									}
								>
									<Menu.Item key="1" onClick={handleClick}>
										<ReadOutlined style={{ fontSize: '25px', color: 'purple' }} />
										<strong>Statistics</strong>
									</Menu.Item>
									<Menu.Item key="2" onClick={handleClick}>
										<ControlOutlined style={{ fontSize: '25px', color: 'blue' }} />
										<strong>Commands</strong>
									</Menu.Item>
								</SubMenu>

								<SubMenu
									key="sub4"
									title={
										<span>
											<AlertOutlined style={{ fontSize: '25px', color: 'red' }} />
											<strong>Traffic Lights</strong>
										</span>
									}
								>
									<Menu.Item key="3" onClick={handleClick}>
										<ReadOutlined style={{ fontSize: '25px', color: 'purple' }} />
										<strong>Statistics</strong>
									</Menu.Item>
									<Menu.Item key="4" onClick={handleClick}>
										<ControlOutlined style={{ fontSize: '25px', color: 'blue' }} />
										<strong>Commands</strong>
									</Menu.Item>
								</SubMenu>

								<Menu.Item
									key="5"
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
					{viewPortItem === 3 && userData.user_id !== null && userManager !== false ? (
						<div
							className="site-layout-background"
							style={{ padding: 24, zIndex: 1, display: 'flex', flexWrap: 'wrap-reverse' }}
						>
							<div style={{ flex: 0.7 }}>
								<Descriptions title="User Info" bordered>
									<Descriptions.Item label="User Id">
										<strong>{userData._id}</strong>
									</Descriptions.Item>
									<Descriptions.Item label="UserName">
										<strong>{userData.name}</strong>
									</Descriptions.Item>
									<Descriptions.Item label="Email">
										<strong>{userData.email}</strong>
									</Descriptions.Item>
									<Descriptions.Item label="AccessLevel">
										<Space>
											<strong>{userData.accessLevel}</strong>
											<Space>
												<Button
													type="primary"
													size="small"
													onClick={handleLevel1}
													id={userData._id}
												>
													Level 1
												</Button>
												<Button
													type="primary"
													size="small"
													onClick={handleLevel2}
													id={userData._id}
												>
													Level 2
												</Button>
												<Button
													type="primary"
													size="small"
													onClick={handleLevel3}
													id={userData._id}
												>
													Level 3
												</Button>
											</Space>
										</Space>
									</Descriptions.Item>
								</Descriptions>
							</div>
							<div style={{ flex: 0.3, textAlign: 'center' }}>
								<Image
									width={200}
									height={200}
									style={{ padding: '30px' }}
									src={`https://api.adorable.io/avatars/285/${userData._id}.png`}
									fallback="data:image/png;base64,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"
								/>
							</div>
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
