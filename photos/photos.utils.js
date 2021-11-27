export const handleParseHashtags = (caption) => {
  if (caption.indexOf("#") === -1) {
    return;
  }
  const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
  const hashtagArray = hashtags.map((hashtag) => ({ where: { hashtag }, create: { hashtag } }));
  return hashtagArray;
};
