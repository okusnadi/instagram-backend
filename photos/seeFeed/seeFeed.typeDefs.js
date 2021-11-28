import { gql } from "apollo-server-core";

export default gql`
  type SeeFeedResult {
    ok: Boolean!
    error: String
    photo: [Photo]
  }

  type Query {
    seeFeed: SeeFeedResult!
  }
`;
