import React from 'react';
import {
  render,
  wait,
  fireEvent,
  act,
  queryByTestId,
} from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import { MockedProvider } from 'react-apollo/test-utils';
import { MemoryRouter, Switch, Route } from 'react-router-dom';

import theme from '../theme';

import Register from '../views/Register';
import Home from '../views/Home';
import { REGISTER_USER } from '../queries/auth';

const correctRequest = {
  query: REGISTER_USER,
  variables: {
    username: 'John',
    password: 'testing',
    passwordConfirm: 'testing',
  },
};

const everyInputWrong = {
  query: REGISTER_USER,
  variables: {
    username: 'Al',
    password: 'test',
    passwordConfirm: 'lol',
  },
};

const positiveMock = [
  {
    request: correctRequest,
    result: {
      data: {
        register: {
          token: 'some correct token',
          errors: [],
        },
      },
    },
  },
];

const negativeMock = [
  {
    request: everyInputWrong,
    result: {
      data: {
        register: {
          token: null,
          errors: [
            {
              message: 'Username has to be at least 3 characters long',
              field: 'username',
            },
            {
              message: 'Password has to be at least 5 characters long',
              field: 'password',
            },
            {
              message: "Passwords don't match",
              field: 'passwordConfirm',
            },
          ],
        },
      },
    },
  },
];

const initialEntries = ['/register'];

const renderWithMock = (mock, addTypename) =>
  render(
    <MockedProvider mocks={mock} addTypename={addTypename}>
      <MemoryRouter initialEntries={initialEntries}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
            {/* <Register />
            <Home /> */}
          </Switch>
        </ThemeProvider>
      </MemoryRouter>
    </MockedProvider>
  );

const setInputValues = (
  getByLabelText,
  username,
  password,
  passwordConfirm
) => {
  fireEvent.change(getByLabelText(/username/i), {
    target: { value: username },
  });
  fireEvent.change(getByLabelText(/password/i), {
    target: { value: password },
  });
  fireEvent.change(getByLabelText(/confirm password/i), {
    target: { value: passwordConfirm },
  });
};

describe('<Register />', () => {
  test('should render without error', () => {
    const { getByTestId } = renderWithMock(positiveMock, false);
    expect(getByTestId('register-form')).toBeInTheDocument();
  });

  test('should show the spinner in the button after submitting the form with all inputs provided', async () => {
    const { getByTestId, getByText, getByLabelText, debug } = renderWithMock(
      positiveMock,
      false
    );
    const btn = getByText(/register/i);
    const form = getByTestId('register-form');
    setInputValues(getByLabelText, 'John', 'testing', 'testing');
    expect(btn).toHaveTextContent(/register/i);
    fireEvent.submit(form);
    expect(btn).not.toHaveTextContent(/register/i);
    expect(btn).toContainElement(getByTestId('spinner'));
  });

  test(`should show error border and error text for every input when they're wrong`, async () => {
    const { getByTestId, getByText, getByLabelText } = renderWithMock(
      negativeMock,
      false
    );
    const form = getByTestId('register-form');
    setInputValues(getByLabelText, 'Al', 'test', 'lol');
    fireEvent.submit(form);
    await wait(() => {
      expect(
        getByLabelText(/username/i) &&
          getByLabelText(/password/i) &&
          getByLabelText(/confirm password/i)
      ).toHaveStyle(`
        border: 1px solid ${theme.colors.danger};
      `);
      expect(getByText(/username has to be at least 3 characters long/i))
        .toHaveStyle(`
        color: ${theme.colors.dangerText};
      `);
      expect(getByText(/password has to be at least 5 characters long/i))
        .toHaveStyle(`
      color: ${theme.colors.dangerText};
    `);
      expect(getByText(/passwords don't match/i)).toHaveStyle(`
    color: ${theme.colors.dangerText};
    `);
    });
  });

  test('should redirect to /home on successful account creation', async () => {
    const { getByTestId, getByLabelText, queryByTestId } = renderWithMock(
      positiveMock,
      false
    );
    expect(queryByTestId('home-page')).not.toBeInTheDocument();
    const form = getByTestId('register-form');
    setInputValues(getByLabelText, 'John', 'testing', 'testing');
    fireEvent.submit(form);
    await wait(() => {
      expect(getByTestId('home-page')).toBeInTheDocument();
      expect(form).not.toBeInTheDocument();
    });
  });
});
