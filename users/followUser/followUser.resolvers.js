import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    // 팔로우 유저
    followUser: protectedResolver(async (_, { followUsername }, { loggedInUser }) => {
      const foundUser = await client.user.findUnique({ where: { username: followUsername } });
      if (!foundUser) {
        return { ok: false, error: "존재하지 않는 유저입니다." };
      }

      try {
        await client.user.update({ where: { id: loggedInUser.id }, data: { followings: { connect: { username: followUsername } } } });
        return { ok: true, error: "팔로우에 성공하였습니다." };
      } catch (error) {
        console.log("followUser error", error);
        return { ok: false, error: "팔로우에 실패하였습니다." };
      }
    }),
  },
};
