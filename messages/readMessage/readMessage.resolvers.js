import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    // 상대방이 보낸 메시지 읽기
    // 메세지를 읽으려면 읽으려는 메세지의 id가 필요하고, 내가 보낸 메세지가 아니여야 하고, 내가 그 메세지가 존재하는 방에 들어있는 유저 중 한명이어야 한다.
    readMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
      try {
        // 내가 아닌 상대방이 보낸 메세지를 찾아와서 존재한다면 read를 false에서 true로 변경
        const foundMessage = await client.message.findFirst({ where: { id, userId: { not: loggedInUser.id }, room: { users: { some: { id: loggedInUser.id } } } } });
        if (!foundMessage) {
          return { ok: false, error: "읽지 않은 메세지가 없습니다." };
        }

        const updatedMessage = await client.message.update({ where: { id }, data: { read: true } });
        return { ok: true, error: "메세지 읽기에 성공하였습니다." };
      } catch (error) {
        console.log("readMessage error");
        return { ok: false, error: "메세지 읽기에 실패하였습니다." };
      }
    }),
  },
};
