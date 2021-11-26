import client from "../../client";

export default {
  Query: {
    searchPhotos: async (_, { keyword }) => {
      try {
        const foundPhotos = await client.photo.findMany({ where: { caption: { startsWith: keyword, contains: keyword } } });
        return { ok: true, error: "사진 검색을 성공하였습니다.", photos: foundPhotos };
      } catch (error) {
        console.log("searchPhotos error", error);
        return { ok: true, error: "사진 검색을 실패하였습니다.", photos: null };
      }
    },
  },
};
