import React from 'react';
import App from './App';
import { render } from 'react-testing-library';

it('shows hello in the text', () => {
  const { getByText } = render(<App />);
  expect(getByText('Hello')).toBeInTheDocument();
});
