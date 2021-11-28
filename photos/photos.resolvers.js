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
    totalLikes: async ({ id }) => {
      const totalLikes = await client.like.count({ where: { photoId: id } });
      return totalLikes;
    },
  },

  Hashtag: {
    photos: async ({ id }, { page }) => {
      const photos = await client.photo.findMany({ where: { hashtags: { some: { id } } } });
      return photos;
    },
    totalPhotos: async ({ id }) => {
      const totalPhotos = await client.photo.count({ where: { hashtags: { some: { id } } } });
      return totalPhotos;
    },
  },
};
