import { gql } from "apollo-server-core";

export default gql`
  scalar Upload

  type UploadPhotoResult {
    ok: Boolean!
    error: String
    photo: Photo
  }

  type Mutation {
    uploadPhoto(file: Upload!, caption: String): UploadPhotoResult!
  }
`;
