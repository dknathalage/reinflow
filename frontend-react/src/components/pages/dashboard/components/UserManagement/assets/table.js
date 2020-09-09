import React from 'react';
import { Tag, Space, Button, Popconfirm } from 'antd';
import { DownloadOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import { handleCLick } from '../index';

export const columns = [
	{
		title: <strong>ID</strong>,
		dataIndex: '_id',
		key: 'id'
	},
	{
		title: <strong>UserName</strong>,
		dataIndex: 'name',
		key: 'name'
	},
	{
		title: <strong>Email Address</strong>,
		dataIndex: 'email',
		key: 'email'
	},
	{
		title: <strong>Access Level</strong>,
		dataIndex: 'accessLevel',
		key: 'accessLevel'
	},

	{
		title: <strong>Action</strong>,
		key: 'action',
		render: (text, record) => (
			<Space size="middle">
				<Button
					type="primary"
					shape="round"
					icon={<UserOutlined />}
					size="large"
					key={record._id}
					id={record._id}
					onClick={handleCLick}
				>
					Manage
				</Button>
				<Button
					type="primary"
					shape="round"
					icon={<UserOutlined />}
					size="large"
					key={record._id}
					id={record._id}
					onClick={handleCLick}
				>
					User Profile
				</Button>
			</Space>
		)
	}
];
