import { gql } from "apollo-server-core";

export default gql`
  type SearchUsersResult {
    ok: Boolean!
    error: String
    users: [User]
  }

  type Query {
    searchUsers(username: String!): SearchUsersResult!
  }
`;
