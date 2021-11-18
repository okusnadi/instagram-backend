import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import { GraphQLUpload } from "graphql-upload";

export default {
  Upload: GraphQLUpload,
  Mutation: {
    // 프로필 수정
    editProfile: protectedResolver(async (_, { firstName, lastName, username, email, password, bio, avatar }, { loggedInUser }) => {
      console.log("avatar", avatar);

      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const updatedUser = await client.user.update({
        where: { id: loggedInUser.id },
        data: { firstName, lastName, username, email, ...(hashedPassword && { password: hashedPassword }), bio },
      });
      if (updatedUser) {
        return { ok: true };
      } else {
        return { ok: false, error: "프로필 업데이트에 실패하였습니다." };
      }
    }),
  },
};
