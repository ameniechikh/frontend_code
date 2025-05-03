import { gql } from '@apollo/client';

export const FIND_USERS = gql`
  query Find {
    users: find {
      id
      name
      email
      role
      status
    }
  }
`;
