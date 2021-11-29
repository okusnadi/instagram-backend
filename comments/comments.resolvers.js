export default {
  Comment: {
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (userId === loggedInUser?.id) {
        return true;
      } else {
        return false;
      }
    },
  },
};
