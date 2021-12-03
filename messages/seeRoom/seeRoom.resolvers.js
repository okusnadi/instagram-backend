import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeRoom: protectedResolver(async (_, { roomId }, { loggedInUser }) => {
      try {
        // 채팅방을 찾음
        const foundRoom = await client.room.findFirst({ where: { id: roomId, users: { some: { id: loggedInUser.id } } } });
        if (foundRoom === null) {
          return { ok: false, error: "존재하는 채팅방이 없습니다.", room: null };
        }

        return { ok: true, error: "채팅방 찾기에 성공하였습니다.", room: foundRoom };
      } catch (error) {
        console.log("seeRoom error");
        return { ok: false, error: "채팅방 찾기에 실패하였습니다.", room: null };
      }
    }),
  },
};
