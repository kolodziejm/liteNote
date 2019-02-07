import { gql } from 'apollo-boost';

export const GET_NOTE = gql`
  query($id: ID!) {
    getNote(id: $id) {
      _id
      title
      tags
      content
    }
  }
`;

export const GET_ALL_NOTES = gql`
  query {
    getAllNotes {
      _id
      title
      tags
      excerpt
    }
  }
`;

export const CREATE_OR_UPDATE_NOTE = gql`
  mutation($title: String!, $tags: [String], $content: String, $id: ID) {
    createOrUpdateNote(title: $title, tags: $tags, content: $content, id: $id) {
      note {
        _id
        title
        content
        tags
      }
      errors {
        field
        message
      }
    }
  }
`;
