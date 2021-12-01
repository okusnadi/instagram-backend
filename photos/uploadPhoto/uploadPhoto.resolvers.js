import client from "../../client";
import { handleUploadPhotoToAWS } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";
import { handleParseHashtags } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(async (_, { file, caption }, { loggedInUser }) => {
      try {
        let hashtagArray = [];

        if (caption) {
          // 1. 캡션이 존재하면 캡션에서 정규표현식을 통해 해시태그를 추출
          // const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);

          // 2. 추출한 해시태그를 통해 새로운 해시태그를 생성 (connectOrCreate에서 사용할 배열 생성)
          // hashtagArray = hashtags.map((hashtag) => ({ where: { hashtag }, create: { hashtag } }));

          // 위의 1,2번 과정을 handleParseHashtags함수를 생성해서 축약함
          hashtagArray = handleParseHashtags(caption);
        }

        const fileUrl = await handleUploadPhotoToAWS(file, `uploads/${loggedInUser.username}`);

        // 3. 사진을 위에서 생성한 새로운 해시태그 배열과 함께 DB에 생성 (사진을 업로드하면 해시태그 모델도 자동 생성됨)
        const newPhoto = await client.photo.create({
          data: {
            file: fileUrl,
            caption,
            user: { connect: { id: loggedInUser.id } },
            ...(hashtagArray?.length > 0 && { hashtags: { connectOrCreate: hashtagArray } }),
          },
        });

        return { ok: true, error: "사진 업로드에 성공하였습니다.", photo: newPhoto };
      } catch (error) {
        console.log("uploadPhoto error", error);
        return { ok: false, error: "사진 업로드에 실패하였습니다.", photo: null };
      }
    }),
  },
};
