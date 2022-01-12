import nc from 'next-connect';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../../lib/s3';

async function upload(req, res) {
	try {
		const params = {
			Bucket: 'assets.aurelius.ink',
			Key: '',
			Body: '',
		};

		console.log('Uploading...');
		const result = await s3Client.send(new PutObjectCommand(params));
		console.log('Uploaded!');
		res.status(200).json({ message: 'uploaded', result });
	} catch (e) {
		res.status(400).json({ error: e });
	}
}

export default nc({ attachParams: true }).put(upload);
