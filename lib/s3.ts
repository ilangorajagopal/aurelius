import aws from 'aws-sdk';
const REGION = process.env.MY_AWS_DEFAULT_REGION;
const AWS_ACCESS_KEY_ID = process.env.MY_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.MY_AWS_SECRET_ACCESS_KEY;
aws.config.update({
	accessKeyId: AWS_ACCESS_KEY_ID,
	secretAccessKey: AWS_SECRET_ACCESS_KEY,
	region: REGION,
});
const s3Client = new aws.S3();

export { s3Client };
