import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import ReinFlowMap from '../../../components/map';

import './admin.css';
import ReinFlowFooter from '../../footer/footer';
import Headers from '../../header';

const { Header, Content } = Layout;

export default function AdminHome() {
	return (
		<React.Fragment>
			<Headers />
			<Layout className="site-layout" style={{ marginLeft: 200, minHeight: '100vh' }}>
				<Header className="site-layout-background" style={{ padding: 0, position: 'fixed', width: '100%' }} />
				<Content style={{ margin: '29px 16px 0', overflow: 'initial' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>Overview</Breadcrumb.Item>
					</Breadcrumb>
					<div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
						<ReinFlowMap />
					</div>
				</Content>
				<ReinFlowFooter />
			</Layout>
		</React.Fragment>
	);
}
