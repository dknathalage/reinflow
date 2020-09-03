import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store/store';

test('renders main page, checks for Overview page', () => {
	const { getByText } = render(
		<Provider store={store}>
			<App />
		</Provider>
	);
	const linkElement = getByText(/Our Overview page/);
	expect(linkElement).toBeInTheDocument();
});
