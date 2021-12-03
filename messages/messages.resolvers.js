import client from "../client";

export default {
  Room: {
    // 채팅방에 있는 전체 유저들을 가져옴
    users: async ({ id }) => {
      const foundUser = await client.room.findUnique({ where: { id } }).users();
      return foundUser;
    },

    // 채팅방에 있는 전체 메세지들을 가져옴
    messages: async ({ id }) => {
      const foundMessage = await client.message.findMany({ where: { roomId: id }, orderBy: { createdAt: "asc" } });
      return foundMessage;
    },

    // 채팅방에 읽지 않은 전체 메세지 수를 가져옴
    unreadTotal: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      const foundUnreadTotalMessage = await client.message.count({ where: { read: false, roomId: id, userId: { not: loggedInUser.id } } });
      return foundUnreadTotalMessage;
    },
  },

  Message: {
    // 메세지를 보낸 유저를 찾음
    user: async ({ id }) => {
      const foundUser = await client.message.findUnique({ where: { id } }).user();
      return foundUser;
    },
  },
};
