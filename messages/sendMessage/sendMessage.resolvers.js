import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    sendMessage: protectedResolver(async (_, { payload, roomId, userId }, { loggedInUser }) => {
      try {
        console.log("payload, roomId, userId", payload, roomId, userId);

        if (roomId === undefined && userId === undefined) {
          return { ok: false, error: "방 또는 유저를 입력하세요.", payload: null };
        }

        let room = null;

        // 방이 아직 생성되지 않은 상태에서 첫 메세지를 보낼 때
        if (userId) {
          const foundUser = await client.user.findUnique({ where: { id: userId } });
          if (foundUser === null) {
            return { ok: false, error: "존재하지 않는 유저입니다.", payload: null };
          }

          room = await client.room.create({ data: { users: { connect: [{ id: userId }, { id: loggedInUser.id }] } } });
          console.log("createdRoom", createdRoom);
        }

        // 방이 이미 생성되어 있는 상태에서 메세지를 보낼 때
        if (roomId) {
          room = await client.room.findUnique({ where: { id: roomId } });
          if (room === null) {
            return { ok: false, error: "존재하지 않는 방입니다.", payload: null };
          }
        }

        const createdMessage = await client.message.create({ data: { payload, room: { connect: { id: room.id } }, user: { connect: { id: loggedInUser.id } } } });
        console.log("createdMessage", createdMessage);

        return { ok: true, error: "메세지 전송에 성공하였습니다.", payload };
      } catch (error) {
        console.log("sendMessage error");
        return { ok: false, error: "메세지 전송에 실패하였습니다.", payload: null };
      }
    }),
  },
};
