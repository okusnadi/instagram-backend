import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }

  type Query {
    seeProfile(username: String!): User
  }

  type Mutation {
    createAccount(firstName: String!, lastName: String, username: String!, email: String!, password: String!): User
    login(username: String!, password: String!): LoginResult
  }
`;
