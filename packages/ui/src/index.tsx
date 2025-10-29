// export * from "./AppShell";
export * from "./button";

// Presigned URLs

// Client 1. - Logged-in user wants to upload a file
const requestUploadAccess = async (fileName: string, fileType: string) =>
	fetch(`/api/presigned-url/upload?fileName=${fileName}&fileType=${fileType}`);

// Server 1. - API route that generates a presigned URL
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// api.get("/api/presigned-url/upload", async (req, res) => {
// use fileName and fileType from query params to generate presigned URL
// // timeout
// // http method (probably PUT)
// });
//
// Client 2. - Server responds with a presigned URL
const uploadFileToS3 = async (presignedUrl: string, file: File) =>
	fetch(presignedUrl, { body: file, method: "PUT" });
