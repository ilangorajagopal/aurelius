import nc from 'next-connect';
import prisma from '../../../lib/prisma';

async function getOne(req, res) {
	const { sessionId } = req.params;

	const session = await prisma.writingSession.findUnique({
		where: {
			id: sessionId,
		},
	});
	res.status(200).json({ session });
}

// async function update(req, res) {
//     const { postId } = req.params;
//     const updatedPost = await prisma.post.update({
//         data,
//         where: {
//             id: postId,
//         },
//     });
//     res.status(200).json({ message: 'post_updated', post: updatedPost });
// }
//
// async function deleteOne(req, res) {
//     const { postId } = req.params;
//     const deletedPost = await prisma.post.delete({
//         where: {
//             id: postId,
//         },
//         select: {
//             title: true,
//         },
//     });
//     res.status(200).json({ message: 'post_deleted', post: deletedPost });
// }

export default nc({ attachParams: true }).get(getOne);
