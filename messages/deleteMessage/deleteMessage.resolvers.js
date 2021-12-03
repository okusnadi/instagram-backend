import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteMessage: protectedResolver(async (_, { id }, { loggedInUser }) => {
      try {
        const foundMessage = await client.message.findFirst({ where: { id, userId: loggedInUser.id } });
        if (!foundMessage) {
          return { ok: false, error: "삭제할 수 있는 메세지가 없습니다.", message: null };
        }
        const deletedMessage = await client.message.delete({ where: { id } });
        return { ok: true, error: "메세지 삭제에 성공하였습니다.", message: deletedMessage };
      } catch (error) {
        console.log("deleteMessage error");
        return { ok: false, error: "메세지 삭제에 실패하였습니다.", message: null };
      }
    }),
  },
};
