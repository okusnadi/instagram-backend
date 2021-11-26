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
    photos: [Photo]
    followers: [User]
    followings: [User]
    totalFollowers: Int!
    totalFollowings: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
