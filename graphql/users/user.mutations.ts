import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    user: createUser(input: $input) {
      id
      name
      email
      role
      status
    }
  }
`;


export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    user: updateUser(input: $input) {
      id
      name
      email
      role
      status
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`;