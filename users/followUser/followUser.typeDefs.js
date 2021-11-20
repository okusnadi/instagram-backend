import { gql } from "apollo-server-core";

export default gql`
  type FollowUserResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    followUser(followUsername: String): FollowUserResult
  }
`;
