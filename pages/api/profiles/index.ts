import nc from 'next-connect';
import prisma from '../../../prisma';

async function checkUsername(req, res) {
	const { username } = req.query;

	if (username === '') {
		res.status(400).json({ message: 'invalid_username' });
	}

	const user = await prisma.user.findUnique({
		where: {
			username,
		},
	});

	if (user) {
		res.status(200).json({ available: false });
	} else {
		res.status(200).json({ available: true });
	}
}

export default nc({ attachParams: true }).get(checkUsername);
