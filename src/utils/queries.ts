import { gql } from "@apollo/client";

export const QUERY_LOGIN = gql`
  query Login($email: String!, $passwordHash: String!) {
    user: login(email: $email, passwordHash: $passwordHash) {
      id
      fullname
    }
  }
`;

export const QUERY_MY_INFO = gql`
  query WhoAmI {
    me {
      id
      fullname
    }
  }
`;

export const QUERY_LOGOUT = gql`
  query Logout {
    logout
  }
`;

export const MUTATION_REGISTER = gql`
  mutation Register(
    $email: String!
    $passwordHash: String!
    $fullname: String!
  ) {
    register(email: $email, passwordHash: $passwordHash, fullname: $fullname)
  }
`;
