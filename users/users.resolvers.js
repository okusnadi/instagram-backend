import client from "../client";

export default {
  User: {
    // 전체 팔로워 수
    totalFollowers: async ({ id }) => {
      const followers = await client.user.count({ where: { followings: { some: { id } } } });
      return followers;
    },

    // 전체 팔로잉 수
    totalFollowings: async ({ id }) => {
      const followings = await client.user.count({ where: { followers: { some: { id } } } });
      return followings;
    },

    // 본인 확인
    isMe: ({ id }, args, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      if (id === loggedInUser.id) {
        return true;
      } else {
        return false;
      }
    },

    // 해당 유저를 팔로잉 중인지 체크
    isFollowing: async ({ id }, args, { loggedInUser }) => {
      if (!loggedInUser || id === loggedInUser.id) {
        return false;
      }

      const existingFollowing = await client.user.count({ where: { id: loggedInUser.id, followings: { some: { id } } } });
      if (existingFollowing.length === 0) {
        return false;
      } else {
        return true;
      }
    },

    photos: async ({ id }) => {
      const foundPhoto = await client.user.findUnique({ where: { id } }).photos();
      return foundPhoto;
    },
  },
};
