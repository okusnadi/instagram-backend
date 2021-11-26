import client from "../client";

export default {
  Photo: {
    user: async ({ userId }) => {
      const foundUser = await client.user.findUnique({ where: { id: userId } });
      return foundUser;
    },

    hashtags: async ({ id }) => {
      const foundHashtags = await client.hashtag.findMany({ where: { photos: { some: { id } } } });
      return foundHashtags;
    },
  },
};
