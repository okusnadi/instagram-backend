import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    // 자신이 팔로잉하는 유저들이 올린 사진과 자신이 올린 사진을 최신순으로 보기
    seeFeed: protectedResolver(async (_, __, { loggedInUser }) => {
      try {
        const foundFollowingsPhoto = await client.photo.findMany({
          where: { OR: [{ user: { followers: { some: { id: loggedInUser.id } } } }, { userId: loggedInUser.id }] },
          orderBy: { createdAt: "desc" },
        });
        if (foundFollowingsPhoto.length === 0) {
          return { ok: false, error: "존재하는 피드가 없습니다.", photo: null };
        }
        return { ok: true, error: "피드 보기에 성공하였습니다.", photo: foundFollowingsPhoto };
      } catch (error) {
        console.log("seeFeed error", error);
        return { ok: false, error: "피드 보기에 실패하였습니다.", photo: null };
      }
    }),
  },
};
