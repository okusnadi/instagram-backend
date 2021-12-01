import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import { GraphQLUpload } from "graphql-upload";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import { handleUploadPhotoToAWS } from "../../shared/shared.utils";

export default {
  Upload: GraphQLUpload,
  Mutation: {
    // 프로필 수정
    editProfile: protectedResolver(async (_, { firstName, lastName, username, email, password, bio, avatar }, { loggedInUser }) => {
      let avatarUrl = null;

      if (avatar) {
        avatarUrl = await handleUploadPhotoToAWS(avatar, `avatars/${loggedInUser.username}`);
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
        return { ok: true, error: "프로필 업데이트에 성공하였습니다." };
      } else {
        return { ok: false, error: "프로필 업데이트에 실패하였습니다." };
      }
    }),
  },
};
