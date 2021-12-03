import client from "../client";

export default {
  Room: {
    users: async ({ id }) => {
      const foundRoom = await client.room.findUnique({ where: { id } }).users();
      console.log("users foundRoom", foundRoom);
      return foundRoom;
    },
    messages: async ({ id }) => {
      const foundMessage = await client.message.findMany({ where: { roomId: id }, orderBy: { createdAt: "asc" } });
      console.log("messages foundMessage", foundMessage);
      return foundMessage;
    },
    unreadTotal: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      // const foundMessage = await client.message.count({ where: { read: false, roomId: id, userId: { not: { id: loggedInUser.id } } } }); 테스트 필요
      const foundMessage = await client.message.count({ where: { read: false, roomId: id, user: { id: { not: loggedInUser.id } } } });
      console.log("foundMessage count", foundMessage);
      return foundMessage;
    },
  },
};
