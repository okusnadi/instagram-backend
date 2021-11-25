import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(async (_, { file, caption }, { loggedInUser }) => {
      console.log("file, caption", file, caption);
      console.log("loggedInUser", loggedInUser);

      if (caption) {
        // 1. 캡션이 존재한다면 파싱
        const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
        console.log("hashtags", hashtags);

        client.photo.create({
          data: {
            file,
            caption,
            hashtags: {
              connectOrCreate: {
                where: { hashtag: "#pizza" },
                create: { hashtag: "#pizza" },
              },
            },
          },
        });

        // 2. 파싱한 캡션에서 새로운 해시태그를 생성하거나 해시태그가 이미 존재한다면 추가
        // 3. 사진을 새로운 해시태그와 함께 DB에 저장
        // 4. 올린 사진을 해당 해시태그에도 추가
      }

      return { ok: true, error: "사진을 업로드하는데 성공하였습니다.", photo: null };
    }),
  },
};
