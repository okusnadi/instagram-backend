import client from "../../client";

export default {
  Query: {
    seeFollowings: async (_, { username, lastUserId }) => {
      console.log("username,cursor", username, lastUserId);

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

        console.log("followings", followings);
        return { ok: true, error: "팔로잉 보기에 성공하였습니다." };
      } catch (error) {
        console.log("seeFollowings error", error);
        return { ok: true, error: "팔로잉 보기에 실패하였습니다." };
      }
    },
  },
};
