import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Popconfirm } from 'antd';
import { columns } from './assets/table.js';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { openNotificationWithIcon } from '../../../../notification/index.js';
import { get_registered_users } from '../../../../../authentication/fetcher.js';

export const handleCLick = (e) => {
	e.preventDefault();
	const id = e.target.parentElement.id;
	console.log(id);
	//do something with the username
};
function UserManagement() {
	const [ userData, setuserData ] = useState([]);
	const [ isLoading, setisLoading ] = useState(true);
	let userData_ = null;
	useEffect(() => {
		fetchUsers();
		setTimeout(() => {
			setisLoading(false);
		}, 5000);

		return () => {
			//cleanup
		};
	}, []);

	const fetchUsers = async () => {
		const users = await get_registered_users();
		if (users.status === false) {
			openNotificationWithIcon('error', 'Platform Manager', `Something Happened! ${users.message}`);
			setisLoading(true);
			console.log('THIS IS TUE');
		} else {
			userData_ = users;
			setuserData(userData_);
			console.log('done', userData);
		}
	};
	return isLoading === false ? (
		<div>
			<h1>Manage Users</h1>
			<Table columns={columns} dataSource={userData} bordered loading={isLoading} />
		</div>
	) : (
		<div>
			<h1>Manage Users</h1>
			<Table columns={columns} bordered loading={isLoading} />
		</div>
	);
}

export default UserManagement;
