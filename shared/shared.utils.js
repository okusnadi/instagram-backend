import AWS from "aws-sdk";

// AWS에 연결을 위한 함수
AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// AWS에 사진 업로드하는 함수
export const handleUploadPhotoToAWS = async (avatar) => {
  const { filename, createReadStream } = await avatar;
  const readStream = createReadStream();
  const bucketName = "instagram-gw-uploads";
  const fileName = `${Date.now()}-${filename}`;

  const params = {
    Bucket: bucketName,
    Key: fileName,
    ACL: "public-read",
    Body: readStream,
  };

  const result = await new AWS.S3().upload(params).promise();

  return "";
};
