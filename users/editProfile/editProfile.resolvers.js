import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    // 프로필 수정
    editProfile: async (_, { firstName, lastName, username, email, password, token }) => {
      console.log("token", token);

      const { id } = await jwt.verify(token, process.env.SECRET_KEY);
      console.log("decodedToken id", id);

      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const updatedUser = await client.user.update({
        where: { id },
        data: { firstName, lastName, username, email, ...(hashedPassword && { password: hashedPassword }) },
      });
      if (updatedUser) {
        return { ok: true };
      } else {
        return { ok: false, error: "프로필 업데이트에 실패하였습니다." };
      }
    },
  },
};
