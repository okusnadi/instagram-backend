import client from "../../client";

export default {
  Query: {
    // 유저 팔로잉 보기
    seeFollowings: async (_, { username, lastUserId }) => {
      try {
        const existingUser = client.user.findUnique({ where: { username }, select: { username } });
        if (!existingUser) {
          return { ok: false, error: "존재하지 않는 유저입니다." };
        }

        const followings = await client.user.findUnique({ where: { username } }).followings({
          skip: lastUserId ? 1 : 0,
          take: 5,
          ...(lastUserId && { cursor: { id: lastUserId } }),
        });
        return { ok: true, error: "팔로잉 보기에 성공하였습니다.", followings };
      } catch (error) {
        console.log("seeFollowings error", error);
        return { ok: true, error: "팔로잉 보기에 실패하였습니다." };
      }
    },
  },
};
