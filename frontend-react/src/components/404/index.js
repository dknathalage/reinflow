import React from 'react';
import { Result, Button, Layout, Breadcrumb } from 'antd';

import { NavLink } from 'react-router-dom';
import Headers from '../header';
import ReinFlowFooter from '../footer/footer';
const { Header, Content } = Layout;
function Error() {
	return (
		<React.Fragment>
			<Headers />
			<Layout className="site-layout" style={{ marginLeft: 200, minHeight: '100vh' }}>
				<Header className="site-layout-background" style={{ padding: 0, position: 'fixed', width: '100%' }} />
				<Content style={{ margin: '80px 16px 0', overflow: 'initial' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Error</Breadcrumb.Item>
						<Breadcrumb.Item>404</Breadcrumb.Item>
					</Breadcrumb>
					<div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
						<Result
							status="404"
							title="404"
							subTitle="Sorry, the page you visited does not exist."
							extra={
								<Button type="primary">
									<NavLink to="/">Back Home!</NavLink>
								</Button>
							}
						/>
					</div>
				</Content>
				<ReinFlowFooter />
			</Layout>
		</React.Fragment>
	);
}

export default Error;
