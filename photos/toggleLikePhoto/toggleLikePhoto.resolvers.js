import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLikePhoto: protectedResolver(async (_, { id }, { loggedInUser }) => {
      console.log("loggedInUser", id, loggedInUser);

      try {
        const foundPhoto = await client.photo.findUnique({ where: { id } });
        if (!foundPhoto) {
          return { ok: false, error: "존재하지 않는 사진입니다.", photo: null };
        }

        return { ok: true, error: "'좋아요'에 성공하였습니다.", photo: null };
      } catch (error) {
        console.log("likePhoto error", error);
        return { ok: false, error: "'좋아요'에 실패하였습니다.", photo: null };
      }
    }),
  },
};
