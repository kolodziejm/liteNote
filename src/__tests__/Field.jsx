/* eslint-disable no-undef */
import React from 'react';
import { render } from 'react-testing-library';
import { ThemeProvider } from 'styled-components'
import theme from '../theme';

import Field from '../components/Field';

const renderField = props => render(
  <ThemeProvider theme={theme}>
    <Field
      {...props}
    />
  </ThemeProvider>
);

describe('<Field />', () => {
  test('it shows all elements when all props are passed', () => {
    const { getByLabelText, getByText } = renderField({ 
      type: 'text', id: 'id', name: 'Some name', helper: 'Some helper text', label: 'Comp label', required: true, value: 'Some value', changed: () => {} })
    expect(getByLabelText('Comp label')).toBeInTheDocument();
    expect(getByText('Some helper text')).toBeInTheDocument();
  })

  test('it shows a danger border and danger helper when error is passed', () => {
    const { getByDisplayValue, getByText } = renderField({ 
      type: 'text', id: 'id', name: 'Some name', helper: 'Some helper text', label: 'Comp label', required: true, error: 'Some error', value: 'Some value', changed: () => {} })
    expect(getByText('Some error')).toBeInTheDocument();
    expect(getByDisplayValue('Some value')).toHaveStyle(`
      border: 1px solid ${theme.colors.danger}
    `);
    expect(getByText('Some error')).toHaveStyle(`
      color: ${theme.colors.danger}
    `);
  })

  test(`it doesn't show helper text if error nor helper are passed`, () => {
    const { queryByTestId } = renderField({
      type: 'text', id: 'id', name: 'Some name', label: 'Comp label', required: true, value: 'Some value', changed: () => {}
    })
    expect(queryByTestId('helper')).not.toBeInTheDocument();
  })
})
