import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    // 프로필 수정
    editProfile: protectedResolver(async (_, { firstName, lastName, username, email, password }, { loggedInUser }) => {
      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const updatedUser = await client.user.update({
        where: { id: loggedInUser.id },
        data: { firstName, lastName, username, email, ...(hashedPassword && { password: hashedPassword }) },
      });
      if (updatedUser) {
        return { ok: true };
      } else {
        return { ok: false, error: "프로필 업데이트에 실패하였습니다." };
      }
    }),
  },
};
