import nc from 'next-connect';
import prisma from '../../../lib/prisma';

async function getAll(req, res) {
	const posts = await prisma.post.findMany();
	res.status(200).json(posts);
}

async function create(req, res) {
	console.log(req);
	console.log(res);
	res.status(200).json({ message: 'not ready yet' });
}

export default nc({ attachParams: true }).get(getAll).post(create);
