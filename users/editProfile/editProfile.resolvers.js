import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import { GraphQLUpload } from "graphql-upload";
import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Upload: GraphQLUpload,
  Mutation: {
    // 프로필 수정
    editProfile: protectedResolver(async (_, { firstName, lastName, username, email, password, bio, avatar }, { loggedInUser }) => {
      const { filename, createReadStream } = await avatar;
      const readStream = createReadStream();
      const writeStream = createWriteStream(`${process.cwd()}/uploads/${filename}`);
      readStream.pipe(writeStream);

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
