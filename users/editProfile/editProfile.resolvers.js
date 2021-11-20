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
      let avatarUrl = null;

      if (avatar) {
        const { filename, createReadStream } = await avatar;
        const newFileName = `${Date.now()}${filename}`;
        const readStream = createReadStream();
        const writeStream = createWriteStream(`${process.cwd()}/uploads/${newFileName}`);
        readStream.pipe(writeStream);
        avatarUrl = `http://localhost:4000/uploads/${newFileName}`;
      }

      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const updatedUser = await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          firstName,
          lastName,
          username,
          email,
          bio,
          ...(hashedPassword && { password: hashedPassword }),
          ...(avatarUrl && { avatar: avatarUrl }),
        },
      });
      if (updatedUser) {
        return { ok: true };
      } else {
        return { ok: false, error: "프로필 업데이트에 실패하였습니다." };
      }
    }),
  },
};
