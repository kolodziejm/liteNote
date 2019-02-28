import { gql } from 'apollo-boost';

export const GET_NOTE = gql`
  query($id: ID!) {
    getNote(id: $id) {
      _id
      title
      content
      tags {
        _id
        tagName
      }
    }
  }
`;

export const GET_ALL_NOTES = gql`
  query {
    getAllNotes {
      _id
      title
      excerpt
      tags {
        _id
        tagName
      }
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
        tags {
          _id
          tagName
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation($id: ID!) {
    deleteNote(id: $id)
  }
`;
