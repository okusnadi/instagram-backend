import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { handleParseHashtags } from "../photos.utils";

export default {
  Mutation: {
    editPhoto: protectedResolver(async (_, { id, caption }, { loggedInUser }) => {
      try {
        const foundPhoto = await client.photo.findFirst({ where: { id, userId: loggedInUser.id }, include: { hashtags: { select: { hashtag: true } } } });
        if (!foundPhoto) {
          return { ok: false, error: "존재하지 않는 사진입니다.", photo: null };
        }

        const hashtagArray = handleParseHashtags(caption);
        const updatedPhoto = await client.photo.update({ where: { id }, data: { caption, hashtags: { disconnect: foundPhoto.hashtags, connectOrCreate: hashtagArray } } });
        return { ok: true, error: "사진 수정에 성공하였습니다.", photo: updatedPhoto };
      } catch (error) {
        console.log("editPhoto error", error);
        return { ok: false, error: "사진 수정에 실패하였습니다.", photo: null };
      }
    }),
  },
};
