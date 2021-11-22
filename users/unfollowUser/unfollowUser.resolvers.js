import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    // 언팔로우 유저
    unfollowUser: protectedResolver(async (_, { unfollowUsername }, { loggedInUser }) => {
      const foundUser = await client.user.findUnique({ where: { username: unfollowUsername } });
      if (!foundUser) {
        return { ok: false, error: "존재하지 않는 유저입니다." };
      }

      try {
        await client.user.update({ where: { id: loggedInUser.id }, data: { followings: { disconnect: { username: unfollowUsername } } } });
        return { ok: true, error: "언팔로우에 성공하였습니다." };
      } catch (error) {
        console.log("unfollowUser error", error);
        return { ok: false, error: "언팔로우에 실패하였습니다." };
      }
    }),
  },
};
