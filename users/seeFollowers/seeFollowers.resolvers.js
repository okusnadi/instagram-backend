import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      console.log("username, page", username, page);

      const aFollowers = await client.user.findUnique({ where: { username } }).followers({ skip: (page - 1) * 5, take: 5 });
      console.log("aFollowers", aFollowers);

      return { ok: true, error: "팔로워 보기에 성공하였습니다.", followers: aFollowers };
    },
  },
};
