import { gql } from 'apollo-boost';

export const LOGIN_USER = gql`
  query($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      errors {
        field
        message
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation($username: String!, $password: String!, $passwordConfirm: String!) {
    register(
      username: $username
      password: $password
      passwordConfirm: $passwordConfirm
    ) {
      token
      errors {
        field
        message
      }
    }
  }
`;
