import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Popconfirm } from 'antd';
import { columns } from './assets/table.js';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { openNotificationWithIcon } from '../../../../notification/index.js';
import { get_registered_users, get_spec_user } from '../../../../../authentication/fetcher.js';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../../../../redux/store/store';
import { manage_user } from '../../../../../redux/actions/user/index';

export const handleCLick = async (e) => {
	try {
		e.preventDefault();
		const id = e.target.parentElement.id;
		openNotificationWithIcon('success', 'Platform Manager', 'Now Fetching your request.');
		setTimeout(async () => {
			const User = await get_spec_user(id);
			if (User.status === true) {
				let user = await User.user;
				setTimeout(() => {
					try {
						store.dispatch(
							manage_user({
								userid: user._id,
								name: user.name,
								email: user.email,
								accessLevel: user.accessLevel
							})
						);
						openNotificationWithIcon('success', 'Dispatcher', 'Fetch Dispatched!');
					} catch (error) {
						openNotificationWithIcon(
							'error',
							'Platform Manager',
							'Something happened! Please try fetching again.'
						);
					}
				}, 5000);
			} else {
				store.dispatch(
					manage_user({
						userid: null,
						_id: null,
						name: null,
						email: null,
						accessLevel: null
					})
				);
			}
		}, 500);

		//do something with the username
	} catch (error) {
		openNotificationWithIcon('error', 'Platform Manager', 'Something happened! Please try fetching again.');
	}
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
