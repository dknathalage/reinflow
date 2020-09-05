import React, { useState } from 'react';
import { Table, Tag, Space, Popconfirm } from 'antd';
import { columns } from './assets/table.js';
import { QuestionCircleOutlined } from '@ant-design/icons';

export const handleCLick = (e) => {
	e.preventDefault();
	const username = e.target.parentElement.id;
	//do something with the username
};
function UserManagement() {
	const [ showPopUp, setshowPopUp ] = useState(false);
	const data = [
		{
			key: '1',
			name: 'null',
			email: 'null',
			address: 'null',
			tags: [ 'developer' ]
		}
	];

	const [ userData, setuserData ] = useState(null);
	return (
		<div>
			<h1>Manage Users</h1>
			<Table columns={columns} dataSource={data} bordered />
		</div>
	);
}

export default UserManagement;
