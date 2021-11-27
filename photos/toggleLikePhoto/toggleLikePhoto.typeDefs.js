import { gql } from "apollo-server-core";

export default gql`
  type ToggleLikePhotoResult {
    ok: Boolean!
    error: String
    photo: Photo
  }

  type Mutation {
    toggleLikePhoto(id: Int!): ToggleLikePhotoResult!
  }
`;
