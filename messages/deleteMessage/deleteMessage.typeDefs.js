import { gql } from "apollo-server-core";

export default gql`
  type DeleteMessageResult {
    ok: Boolean!
    error: String
    message: Message
  }

  type Mutation {
    deleteMessage(id: Int!): DeleteMessageResult!
  }
`;
