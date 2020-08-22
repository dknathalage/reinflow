import React from 'react';
import logo from './assets/REINFLOW.png';
import './App.css';
function App() {
	return (
		<div className="App">
			<div className="container">
				<img src={logo} alt="" />
				<h1>ReinFlow - User face</h1>
				<h2>
					The following will have a user end and an admin end. Graphs and stats will be displayed to users and
					admins <br /> where admins will see an over view of everything happening.
				</h2>
			</div>
		</div>
	);
}

export default App;
