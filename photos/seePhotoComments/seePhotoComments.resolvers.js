import client from "../../client";

export default {
  Query: {
    seePhotoComments: async (_, { photoId }) => {
      try {
        const foundComments = await client.comment.findMany({ where: { photoId }, orderBy: { createdAt: "desc" } });
        if (foundComments.length === 0) {
          return { ok: false, error: "사진에 댓글이 존재하지 않습니다.", comments: null };
        }
        return { ok: true, error: "사진 댓글 보기에 성공하였습니다.", comments: foundComments };
      } catch (error) {
        console.log("seePhotoComments error", error);
        return { ok: false, error: "사진 댓글 보기에 실패하였습니다.", comments: null };
      }
    },
  },
};
