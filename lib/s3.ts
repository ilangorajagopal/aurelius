import aws from 'aws-sdk';
const REGION = process.env.AWS_REGION;
aws.config.update({ region: REGION });
const s3Client = new aws.S3();

export { s3Client };
