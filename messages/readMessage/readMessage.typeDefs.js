import { gql } from "apollo-server-core";

export default gql`
  type ReadMessageResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    readMessage(id: Int!): ReadMessageResult!
  }
`;
