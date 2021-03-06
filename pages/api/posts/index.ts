import nc from 'next-connect';
import prisma from '../../../prisma';

async function getAllFromAuthor(req, res) {
	const { userId } = req.query;

	if (!userId) {
		res.status(400).json({ message: 'invalid_user_id' });
	}
	const posts = await prisma.post.findMany({
		where: { userId },
		orderBy: { createdAt: 'desc' },
	});
	res.status(200).json({ posts });
}

async function create(req, res) {
	const data = req.body.data;
	const newPost = await prisma.post.create({
		data,
	});
	res.status(200).json({ message: 'post_created', post: newPost });
}

export default nc({ attachParams: true }).get(getAllFromAuthor).post(create);
