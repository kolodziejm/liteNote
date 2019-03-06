import { gql } from 'apollo-boost';

export const GET_NOTE = gql`
  query($id: ID!) {
    getNote(id: $id) {
      title
      content
      tags {
        id
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
        id
        tagName
      }
    }
  }
`;

export const CREATE_NOTE = gql`
  mutation($title: String!, $tags: [TagInput], $content: String, $id: ID) {
    createOrUpdateNote(title: $title, tags: $tags, content: $content, id: $id) {
      note {
        _id
      }
      errors {
        field
        message
      }
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation($title: String!, $tags: [TagInput], $content: String, $id: ID) {
    createOrUpdateNote(title: $title, tags: $tags, content: $content, id: $id) {
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
