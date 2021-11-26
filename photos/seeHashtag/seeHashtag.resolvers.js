import client from "../../client";

export default {
  Query: {
    seeHashtag: async (_, { hashtag }) => {
      try {
        const foundHashtag = await client.hashtag.findUnique({ where: { hashtag } });
        return { ok: true, error: "해시태그 보기에 성공하였습니다.", hashtag: foundHashtag };
      } catch (error) {
        console.log("seeHashtag error", error);
        return { ok: false, error: "해시태그 보기에 실패하였습니다.", hashtag: null };
      }
    },
  },
};
