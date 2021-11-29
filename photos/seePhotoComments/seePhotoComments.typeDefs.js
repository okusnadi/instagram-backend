import { gql } from "apollo-server-core";

export default gql`
  type SeePhotoCommentsResult {
    ok: Boolean!
    error: String
    comments: [Comment]
  }

  type Query {
    seePhotoComments(photoId: Int!): SeePhotoCommentsResult!
  }
`;
