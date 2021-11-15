import client from "../client";

export default {
  Query: {
    // 프로필 확인
    seeProfile: async (_, { username }) => {
      try {
        // username을 가진 유저가 있는지 DB에서 체크 후, 있다면 해당 유저 정보를 찾아옴
        const foundUser = await client.user.findUnique({ where: { username } });
        if (foundUser === null) {
          throw new Error("유저를 찾을 수 없습니다.");
        }
        return foundUser;
      } catch (error) {
        console.log("seeProfile error", error);
        return error;
      }
    },
  },
};
