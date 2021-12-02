import { gql } from "apollo-server-core";

export default gql`
  type Room {
    id: Int!
    users: [User]
    messages: [Message]
    createdAt: String!
    updatedAt: String!
  }

  type Message {
    id: Int!
    payload: String!
    user: User!
    room: Room!
    createdAt: String!
    updatedAt: String!
  }
`;
