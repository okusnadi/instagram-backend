import AWS from "aws-sdk";

const s3 = new AWS.S3();

s3.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// AWS에 사진을 업로드하는 함수
export const handleUploadPhotoToAWS = async (file, folderName) => {
  const { filename, createReadStream } = await file;
  const bucketName = "instagram-gw-uploads";
  const fileName = `${folderName}/${Date.now()}-${filename}`;
  const readStream = createReadStream();

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: readStream,
  };

  const { Location } = await s3.upload(params).promise();

  return Location;
};
