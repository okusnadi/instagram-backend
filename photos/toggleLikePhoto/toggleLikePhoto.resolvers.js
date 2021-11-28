import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    // 사진 좋아요, 좋아요 취소
    toggleLikePhoto: protectedResolver(async (_, { photoId }, { loggedInUser }) => {
      try {
        const foundPhoto = await client.photo.findUnique({ where: { id: photoId } });
        if (!foundPhoto) {
          return { ok: false, error: "존재하지 않는 사진입니다.", photo: null };
        }

        const foundLike = await client.like.findUnique({ where: { photoId_userId: { photoId, userId: loggedInUser.id } } });
        if (foundLike) {
          await client.like.delete({ where: { photoId_userId: { photoId, userId: loggedInUser.id } } });
          return { ok: true, error: "'좋아요'를 취소하였습니다.", photo: foundPhoto };
        } else {
          await client.like.create({ data: { user: { connect: { id: loggedInUser.id } }, photo: { connect: { id: foundPhoto.id } } } });
          return { ok: true, error: "'좋아요'에 성공하였습니다.", photo: foundPhoto };
        }
      } catch (error) {
        console.log("likePhoto error", error);
        return { ok: false, error: "'좋아요'에 실패하였습니다.", photo: null };
      }
    }),
  },
};
