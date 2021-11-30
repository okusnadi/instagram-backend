import { gql } from "apollo-server-core";

export default gql`
  type DeleteCommentResult {
    ok: Boolean!
    error: String
    comment: Comment
  }

  type Mutation {
    deleteComment(commentId: Int!): DeleteCommentResult!
  }
`;
