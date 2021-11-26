import { gql } from "apollo-server-core";

export default gql`
  type SeeHashtagResult {
    ok: Boolean!
    error: String
    hashtag: Hashtag!
  }

  type Query {
    seeHashtag(hashtag: String!): SeeHashtagResult!
  }
`;
