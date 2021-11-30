import { gql } from "apollo-server-core";

export default gql`
  type EditCommentResult {
    ok: Boolean!
    error: String
    comment: Comment
  }

  type Mutation {
    editComment(commentId: Int!, payload: String!): EditCommentResult!
  }
`;
