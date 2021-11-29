import nc from 'next-connect';
import prisma from '../../../prisma';

async function getOne(req, res) {
	const { id } = req.query;

	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	});
	res.status(200).json({ user });
}

async function update(req, res) {
	const { id } = req.query;
	const data = req.body.data;
	const updatedUser = await prisma.user.update({
		data,
		where: {
			id,
		},
	});
	res.status(200).json({ message: 'user_updated', user: updatedUser });
}

// async function deleteOne(req, res) {
//     const { id } = req.query;
//     const deletedUser = await prisma.user.delete({
//         where: {
//             id,
//         },
//         select: {
//             email: true,
//         },
//     });
//     res.status(200).json({ message: 'user_deleted', user: deletedUser });
// }

export default nc({ attachParams: true }).get(getOne).put(update);
