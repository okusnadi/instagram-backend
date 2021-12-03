import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    readMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
      try {
        const foundMessage = await client.message.findFirst({ where: { id, userId: { not: loggedInUser.id }, room: { users: { some: { id: loggedInUser.id } } } } });
        console.log("readMessage foundMessage", foundMessage);
        if (!foundMessage) {
          return { ok: false, error: "읽지 않은 메세지가 없습니다." };
        }

        const updatedMessage = await client.message.update({ where: { id }, data: { read: true } });
        console.log("updatedMessage", updatedMessage);
        return { ok: true, error: "메세지 읽기에 성공하였습니다." };
      } catch (error) {
        console.log("readMessage error");
        return { ok: false, error: "메세지 읽기에 실패하였습니다." };
      }
    }),
  },
};
