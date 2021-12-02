import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Query: {
    seeRoom: protectedResolver(async (_, { roomId }, { loggedInUser }) => {
      try {
        const foundRoom = await client.room.findFirst({ where: { id: roomId, users: { some: { id: loggedInUser.id } } } });
        console.log("foundRoom", foundRoom);
        if (foundRoom === null) {
        }

        return { ok: false, error: "채팅방 보기에 실패하였습니다.", room: null };
      } catch (error) {
        console.log("seeRoom error");
        return { ok: false, error: "채팅방 보기에 실패하였습니다.", room: null };
      }
    }),
  },
};
