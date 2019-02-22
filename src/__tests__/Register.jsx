import React from 'react';
import { render, wait, fireEvent } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import { MockedProvider } from 'react-apollo/test-utils';

import { ClipLoader } from 'react-spinners';
import theme from '../theme';

import { Register } from '../views/Register';
import { REGISTER_USER } from '../queries/auth';

const correctRequest = {
  query: REGISTER_USER,
  variables: {
    username: 'John',
    password: 'testing',
    passwordConfirm: 'testing',
  },
};

const passwordsDontMatch = {
  query: REGISTER_USER,
  variables: {
    username: 'blabla',
    password: 'testing',
    passwordConfirm: 'test',
  },
};

const usernameTooShort = {
  query: REGISTER_USER,
  variables: {
    username: 'qw',
    password: 'testing',
    passwordConfirm: 'testing',
  },
};

const positiveMock = [
  {
    request: correctRequest,
  },
  {
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

const passwordsDontMatchMock = [
  {
    request: passwordsDontMatch,
  },
  {
    result: {
      data: {
        register: {
          token: null,
          errors: [
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

const tooShortUsernameMock = [
  {
    request: usernameTooShort,
  },
  {
    result: {
      data: {
        register: {
          token: null,
          errors: [
            {
              message: 'Username has to be at least 3 characters long',
              field: 'username',
            },
          ],
        },
      },
    },
  },
];

describe('<Register />', () => {
  test('should render without error', () => {
    const { getByText } = render(
      <MockedProvider mocks={[]}>
        <ThemeProvider theme={theme}>
          <Register />
        </ThemeProvider>
      </MockedProvider>
    );
    const button = getByText(/register/i);
    fireEvent.click(button);
    expect(button);
  });
});
