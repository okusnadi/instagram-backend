import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (_, { commentId }, { loggedInUser }) => {
      try {
        const foundComment = await client.comment.findUnique({ where: { id: commentId } });
        if (!foundComment) {
          return { ok: false, error: "존재하지 않는 댓글입니다." };
        }
        if (foundComment.userId !== loggedInUser.id) {
          return { ok: true, error: "댓글을 작성한 사용자가 아닙니다." };
        }
        const deletedComment = await client.comment.delete({ where: { id: commentId } });
        return { ok: true, error: "댓글 삭제에 성공하였습니다." };
      } catch (error) {
        console.log("deleteComment error", error);
        return { ok: false, error: "댓글 삭제에 실패하였습니다." };
      }
    }),
  },
};
