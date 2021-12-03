import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    // 사용자가 만든 채팅방 전체를 보여줌
    seeRooms: protectedResolver(async (_, __, { loggedInUser }) => {
      try {
        const foundRoom = await client.room.findMany({ where: { users: { some: { id: loggedInUser.id } } } });
        if (foundRoom.length === 0) {
          return { ok: false, error: "존재하는 채팅방이 없습니다.", room: null };
        }
        return { ok: true, error: "채팅방 보기에 성공하였습니다.", room: foundRoom };
      } catch (error) {
        console.log("seeRooms error");
        return { ok: false, error: "채팅방 보기에 실패하였습니다.", room: null };
      }
    }),
  },
};
