import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createComment: protectedResolver(async (_, { photoId, payload }, { loggedInUser }) => {
      try {
        const foundPhoto = await client.photo.findUnique({ where: { id: photoId } });
        if (!foundPhoto) {
          return { ok: false, error: "존재하지 않는 사진입니다.", comment: null };
        }

        const createdComment = await client.comment.create({ data: { payload, user: { connect: { id: loggedInUser.id } }, photo: { connect: { id: photoId } } } });
        return { ok: true, error: "댓글 작성에 성공하였습니다.", comment: createdComment };
      } catch (error) {
        console.log("createComment error", error);
        return { ok: false, error: "댓글 작성에 실패하였습니다.", comment: null };
      }
    }),
  },
};
