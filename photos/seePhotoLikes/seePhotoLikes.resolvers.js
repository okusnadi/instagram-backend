import client from "../../client";

export default {
  Query: {
    seePhotoLikes: async (_, { photoId }) => {
      try {
        const foundLikeUsers = await client.like.findMany({ where: { photoId }, select: { user: true } });
        if (foundLikeUsers.length === 0) {
          return { ok: true, error: "'좋아요'를 누른 유저가 존재하지 않습니다.", users: null };
        }
        const parsedFoundLikeUsers = foundLikeUsers.map((foundLikeUser) => foundLikeUser.user);
        return { ok: true, error: "'좋아요'를 누른 유저 보기에 성공하였습니다.", users: parsedFoundLikeUsers };
      } catch (error) {
        console.log("seePhotoLikes error", error);
        return { ok: false, error: "'좋아요'를 누른 유저 보기에 실패하였습니다.", users: null };
      }
    },
  },
};
