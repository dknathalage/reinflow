import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders main page, checks for Overview page', () => {
	const { getByText } = render(<App />);
	const linkElement = getByText(/Our Overview page/);
	expect(linkElement).toBeInTheDocument();
});
