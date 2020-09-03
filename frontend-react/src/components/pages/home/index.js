import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import ReinFlowMap from '../../../components/map';

import './admin.css';
import ReinFlowFooter from '../../footer/footer';
import Headers from '../../header';

const { Header, Content } = Layout;

export default function AdminHome() {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Headers />
			<Layout className="site-layout">
				<Header className="site-layout-background" style={{ padding: 0 }} />
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>Overview</Breadcrumb.Item>
					</Breadcrumb>
					<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
						<ReinFlowMap />
					</div>
				</Content>
				<ReinFlowFooter />
			</Layout>
		</Layout>
	);
}
