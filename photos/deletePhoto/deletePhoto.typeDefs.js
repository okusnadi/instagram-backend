import { gql } from "apollo-server-core";

export default gql`
  type DeletePhotoResult {
    ok: Boolean!
    error: String
    photo: Photo
  }

  type Mutation {
    deletePhoto(photoId: Int!): DeletePhotoResult!
  }
`;
