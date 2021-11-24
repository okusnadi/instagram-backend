import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { username }) => {
      try {
        const foundUsers = await client.user.findMany({
          where: { OR: [{ username: { mode: "insensitive", startsWith: username.toLowerCase() } }, { username: { contains: username.toLowerCase() } }] },
        });
        if (foundUsers.length === 0) {
          return { ok: false, error: "존재하지 않는 유저입니다.", users: null };
        }
        return { ok: true, error: "유저 검색에 성공하였습니다.", users: foundUsers };
      } catch (error) {
        console.log("searchUsers error", error);
        return { ok: true, error: "유저 검색에 실패하였습니다.", users: null };
      }
    },
  },
};
