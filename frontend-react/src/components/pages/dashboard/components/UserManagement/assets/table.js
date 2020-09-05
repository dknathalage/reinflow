import React from 'react';
import { Tag, Space, Button, Popconfirm } from 'antd';
import { DownloadOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { handleCLick } from '../index';

export const columns = [
	{
		title: 'User Name',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <a>{text}</a>
	},
	{
		title: 'Email Address',
		dataIndex: 'email',
		key: 'email'
	},
	{
		title: 'Tags',
		key: 'tags',
		dataIndex: 'tags',
		render: (tags) => (
			<React.Fragment>
				{tags.map((tag) => {
					let color = tag.length > 5 ? 'geekblue' : 'green';
					if (tag === 'loser') {
						color = 'volcano';
					}
					return (
						<Tag color={color} key={tag}>
							{tag.toUpperCase()}
						</Tag>
					);
				})}
			</React.Fragment>
		)
	},
	{
		title: 'Action',
		key: 'action',
		render: (text, record) => (
			<Space size="middle">
				<Button
					type="primary"
					shape="round"
					icon={<UserOutlined />}
					size="large"
					key={record.name}
					id={record.name}
					onClick={handleCLick}
				>
					Manage
				</Button>
				<Button
					type="primary"
					shape="round"
					icon={<UserOutlined />}
					size="large"
					key={record.name}
					id={record.name}
					onClick={handleCLick}
				>
					User Profile
				</Button>
			</Space>
		)
	}
];
