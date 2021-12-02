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
  },
};
