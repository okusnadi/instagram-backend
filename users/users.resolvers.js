export default {
  User: {
    totalFollowers: (parent) => {
      console.log("parent", parent);

      return 666;
    },
    totalFollowings: () => {
      return 999;
    },
  },
};
