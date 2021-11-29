import nc from 'next-connect';
import prisma from '../../../prisma';

async function getAllFromUser(req, res) {
	const { userId } = req.query;

	const writingSessions = await prisma.writingSession.findMany({
		where: {
			user_id: userId,
		},
	});
	res.status(200).json({ sessions: writingSessions });
}

async function create(req, res) {
	const { data } = req.body;
	const newSession = await prisma.writingSession.create({
		data,
	});
	res.status(200).json({ message: 'session_created', session: newSession });
}

export default nc({ attachParams: true }).get(getAllFromUser).post(create);
