import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editComment: protectedResolver(async (_, { commentId, payload }, { loggedInUser }) => {
      try {
        const foundComment = await client.comment.findUnique({ where: { id: commentId } });
        if (!foundComment) {
          return { ok: false, error: "존재하지 않는 댓글입니다.", comment: null };
        }
        if (foundComment.userId !== loggedInUser.id) {
          return { ok: true, error: "댓글을 작성한 사용자가 아닙니다.", comment: null };
        }
        const updatedComment = await client.comment.update({ where: { id: commentId }, data: { payload } });
        return { ok: true, error: "댓글 수정에 성공하였습니다.", comment: updatedComment };
      } catch (error) {
        console.log("editComment error", error);
        return { ok: false, error: "댓글 수정에 실패하였습니다.", comment: null };
      }
    }),
  },
};
