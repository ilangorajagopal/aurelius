import nc from 'next-connect';
import formidable from 'formidable';
import stream from 'stream';
import { s3Client } from '../../lib/s3';

async function upload(req, res) {
	try {
		const { userId, postId } = req.query;

		const form = formidable({
			fileWriteStreamHandler: (file) => {
				const passthrough = new stream.PassThrough();

				const params = {
					Body: passthrough,
					Bucket: 'assets.aurelius.ink',
					ContentType: file.mimeType,
					Key:
						userId && postId
							? `images/${userId}/${postId}/${file.originalFilename}`
							: `images/guest_user/${file.originalFilename}`,
				};

				s3Client.upload(params, (error, data) => {
					if (error) {
						console.log('Error: ', error);
					}

					res.status(200).json({
						code: 'upload_success',
						data: {
							url: `https://assets.aurelius.ink/${data.key}`,
						},
					});
				});

				return passthrough;
			},
		});

		form.parse(req, (error) => {
			if (error) {
				console.log(error);
				res.status(400).json({ message: 'upload_failed', error });
			}
		});
	} catch (e) {
		res.status(400).json({ error: e });
	}
}

const handler = nc({ attachParams: true }).post(upload);

export const config = {
	api: {
		bodyParser: false,
	},
};

export default handler;
