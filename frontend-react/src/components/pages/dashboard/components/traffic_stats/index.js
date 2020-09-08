import React, { useState } from 'react';
import moment from 'moment';

import { Pie, ChartCard, Field, MiniBar } from 'ant-design-pro/lib/Charts';
import { Card } from 'antd';
function Traffic_Stats() {
	const visitData = [];
	const beginDay = new Date().getTime();
	for (let i = 0; i < 20; i += 1) {
		visitData.push({
			x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
			y: Math.floor(Math.random() * 100) + 10
		});
	}
	const salesPieData = [
		{
			x: 'Sensors',
			y: 4544
		},
		{
			x: 'Other Data',
			y: 342
		},
		{
			x: 'xcv',
			y: 3321
		},
		{
			x: '123',
			y: 3321
		},
		{
			x: 'Smth Else',
			y: 3113
		}
	];
	return (
		<div>
			<h1>Traffic Light FeedBack</h1>
			<div style={{ display: 'flex', flexWrap: 'wrap' }}>
				<Card bordered={true} style={{ width: 300, margin: '10px' }}>
					<Pie subTitle="Light Feed 1" data={salesPieData} height={294} />
				</Card>
				<Card bordered={true} style={{ width: 300, margin: '10px' }}>
					<Pie subTitle="Light Feed 2" data={salesPieData} height={294} />
				</Card>
				<Card bordered={true} style={{ width: 300, margin: '10px' }}>
					<Pie subTitle="Light Feed 3" data={salesPieData} height={294} />
				</Card>
				<Card bordered={true} style={{ width: 300, margin: '10px' }}>
					<Pie subTitle="Light Feed 4" data={salesPieData} height={294} />
				</Card>
			</div>
		</div>
	);
}

export default Traffic_Stats;
