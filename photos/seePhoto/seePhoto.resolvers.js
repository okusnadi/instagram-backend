import client from "../../client";

export default {
  Query: {
    seePhoto: async (_, { id }) => {
      try {
        const foundPhoto = await client.photo.findUnique({ where: { id } });
        return { ok: true, error: "사진 보기를 성공하였습니다.", photo: foundPhoto };
      } catch (error) {
        console.log("seePhoto error", error);
        return { ok: false, error: "사진 보기를 실패하였습니다.", photo: null };
      }
    },
  },
};
