import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      try {
        const existingUser = await client.user.findUnique({ where: { username }, select: { username: true } });
        if (!existingUser) {
          return { ok: false, error: "존재하지 않는 유저입니다." };
        }

        const followers = await client.user.findUnique({ where: { username } }).followers({ skip: (page - 1) * 5, take: 5 });
        if (followers.length === 0) {
          return { ok: false, error: "팔로워가 존재하지 않습니다." };
        }

        const totalFollowers = await client.user.count({ where: { followings: { some: { username } } } });
        return { ok: true, error: "팔로워 보기에 성공하였습니다.", followers, totalPages: Math.ceil(totalFollowers / 5) };
      } catch (error) {
        console.log("seeFollowers error", error);
        return { ok: false, error: "팔로워 보기에 실패하였습니다." };
      }
    },
  },
};
