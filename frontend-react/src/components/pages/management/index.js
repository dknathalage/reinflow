import React, { useState } from 'react';
import Headers from '../../header';
import { Layout, PageHeader, Menu, Breadcrumb } from 'antd';
import { useSelector } from 'react-redux';
import {
	CameraOutlined,
	AlertOutlined,
	UserOutlined,
	QuestionCircleTwoTone,
	PlusCircleTwoTone
} from '@ant-design/icons';
import ReinFlowFooter from '../../footer/footer';
import AddLights from './lights/components/addTrafficLight';
import AddSensors from './sensors/components/addSensor';
import ManageLights from './lights/components/manageTrafficLights';
import ManageSensors from './sensors/components/manageSensors';
import Overview from './overview';
const { Header, Content } = Layout;
const { SubMenu } = Menu;
function Management() {
	const user = useSelector((state) => state.user);
	const [ viewPort, setviewPort ] = useState(<AddSensors />);
	const [ viewPortItem, setviewPortItem ] = useState(null);
	const handleClick = (e) => {
		const key = e.key;
		switch (key) {
			case '1':
				setviewPort(<AddSensors />);
				setviewPortItem(null);
				break;
			case '2':
				setviewPort(<ManageSensors />);
				setviewPortItem(null);
				break;
			case '3':
				setviewPort(<AddLights />);
				setviewPortItem(null);
				break;
			case '4':
				setviewPort(<ManageLights />);
				setviewPortItem(null);
				break;
			case '5':
				setviewPort(<Overview />);
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
						subTitle={`Management`}
					/>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Management</Breadcrumb.Item>
						<Breadcrumb.Item>Dashboard</Breadcrumb.Item>
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
										<PlusCircleTwoTone style={{ fontSize: '25px', color: 'red' }} />
										<strong>Add Sensors</strong>
									</Menu.Item>
									<Menu.Item key="2" onClick={handleClick}>
										<QuestionCircleTwoTone style={{ fontSize: '25px', color: 'green' }} />
										<strong>Manage Sensors</strong>
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
										<PlusCircleTwoTone style={{ fontSize: '25px', color: 'red' }} />
										<strong>Add Lights</strong>
									</Menu.Item>
									<Menu.Item key="4" onClick={handleClick}>
										<QuestionCircleTwoTone style={{ fontSize: '25px', color: 'green' }} />
										<strong>Manage Lights</strong>
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
									<strong>Overview</strong>
								</Menu.Item>
							</Menu>
						</div>
						<div style={{ padding: '20px', width: '100%' }}>{viewPort}</div>
					</div>
					<br />
					{viewPortItem === 3 ? (
						<div className="site-layout-background" style={{ padding: 24, textAlign: 'center', zIndex: 1 }}>
							<h1>OVERVIEW VIEWPORT</h1>
							<h3>Coming Soon!</h3>
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

export default Management;
