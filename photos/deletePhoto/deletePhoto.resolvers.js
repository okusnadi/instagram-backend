import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { photoId }, { loggedInUser }) => {
      try {
        const foundPhoto = await client.photo.findUnique({ where: { id: photoId } });
        console.log("foundPhoto", foundPhoto);

        if (!foundPhoto) {
          return { ok: true, error: "존재하지 않는 사진입니다.", photo: null };
        }
        if (foundPhoto.userId !== loggedInUser.id) {
          return { ok: true, error: "사진을 업로드한 사용자가 아닙니다.", photo: null };
        }

        console.log("foundPhoto.id", foundPhoto.id);

        const deletedPhoto = await client.photo.delete({ where: { id: photoId } });
        console.log("deletedPhoto", deletedPhoto);

        return { ok: true, error: "사진 삭제에 성공하였습니다.", photo: deletedPhoto };
      } catch (error) {
        console.log("deletePhoto error", error);
        return { ok: false, error: "사진 삭제에 실패하였습니다.", photo: null };
      }
    }),
  },
};
