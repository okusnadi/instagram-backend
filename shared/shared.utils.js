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

// AWS에서 사진을 삭제하는 함수
export const handleDeletePhotoFromAWS = async (fileUrl) => {
  const decodedUrl = decodeURI(fileUrl);
  const filePath = decodedUrl.split("/uploads/")[1];
  const bucketName = "instagram-gw-uploads";
  const fileName = `uploads/${filePath}`;

  const params = {
    Bucket: bucketName,
    Key: fileName,
  };

  await s3.deleteObject(params).promise();
};
