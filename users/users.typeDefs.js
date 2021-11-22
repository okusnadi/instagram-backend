import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    bio: String
    avatar: String
    followers: [User]
    followings: [User]
    totalFollowers: Int!
    totalFollowings: Int!
    createdAt: String!
    updatedAt: String!
  }
`;

// isFollowing: Boolean!
// isMe: Boolean!
