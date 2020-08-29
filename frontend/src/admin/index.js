import React from 'react';
import {
	Layout,
	Menu,
	Breadcrumb
} from 'antd';
import {
	DesktopOutlined,
	PieChartOutlined,
	FileOutlined,
	TeamOutlined,
	UserOutlined
} from '@ant-design/icons';

import './admin.css';
import ReinFlowFooter from '../components/footer/footer';

const {
	Header,
	Content,
	Footer,
	Sider
} = Layout;
const {
	SubMenu
} = Menu;

export default function AdminHome() {
	return ( <
		Layout style = {
			{
				minHeight: '100vh'
			}
		} >
		<
		Header style = {
			{
				position: 'fixed',
				zIndex: 1,
				width: '100%',
				marginLeft: '150px'
			}
		} >
		<
		div className = "logo" / >
		<
		Menu theme = "dark"
		mode = "horizontal"
		defaultSelectedKeys = {
			['1']
		} >
		<
		Menu.Item key = "1" > Home < /Menu.Item> <
		Menu.Item key = "2" > Admin < /Menu.Item> <
		Menu.Item key = "3" > Statistics < /Menu.Item> <
		/Menu> <
		/Header> <
		Sider collapsible >
		<
		div className = "logo" / >
		<
		Menu theme = "dark"
		defaultSelectedKeys = {
			['1']
		}
		mode = "inline"
		style = {
			{
				marginTop: '60px'
			}
		} >
		<
		Menu.Item key = "1"
		icon = {
			< PieChartOutlined / >
		} >
		Overview <
		/Menu.Item> <
		Menu.Item key = "2"
		icon = {
			< DesktopOutlined / >
		} >
		Option 2 <
		/Menu.Item> <
		SubMenu key = "sub1"
		icon = {
			< UserOutlined / >
		}
		title = "Predictions" >
		<
		Menu.Item key = "3" > Something here < /Menu.Item> <
		/SubMenu> <
		SubMenu key = "sub2"
		icon = {
			< TeamOutlined / >
		}
		title = "Sensors" >
		<
		Menu.Item key = "4" > Sensor 1 < /Menu.Item> <
		Menu.Item key = "5" > Sensor 2 < /Menu.Item> <
		/SubMenu> <
		Menu.Item key = "9"
		icon = {
			< FileOutlined / >
		}
		/> <
		/Menu> <
		/Sider> <
		Layout className = "site-layout" >
		<
		Header className = "site-layout-background"
		style = {
			{
				padding: 0
			}
		}
		/> <
		Content style = {
			{
				margin: '0 16px'
			}
		} >
		<
		Breadcrumb style = {
			{
				margin: '16px 0'
			}
		} >
		<
		Breadcrumb.Item > Home < /Breadcrumb.Item> <
		Breadcrumb.Item > Overview < /Breadcrumb.Item> <
		/Breadcrumb> <
		div className = "site-layout-background"
		style = {
			{
				padding: 24,
				minHeight: 360
			}
		} >
		Our Overview page <
		/div> <
		/Content> <
		ReinFlowFooter / >
		<
		/Layout> <
		/Layout>
	);
}