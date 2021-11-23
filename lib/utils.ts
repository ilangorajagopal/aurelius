import { getSession } from 'next-auth/react';
import { nanoid } from 'nanoid';

export async function savePostToDB(post, update) {
	if (post) {
		const response = await fetch(`/api/posts/${post.id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: update }),
		});
		const data = await response.json();

		return { data: data.post };
	} else {
		const session = await getSession();
		const id = nanoid(32);
		const share_id = `${update.title.split(' ').join('-')}-${id}`;
		const record = { ...update, share_id, author_id: session.user.id };
		const response = await fetch('/api/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: record }),
		});
		const data = await response.json();

		return { data: data.post };
	}
}

export async function saveSessionToDB(update) {
	const session = await getSession();
	const record = { ...update, user_id: session.user.id };
	const response = await fetch('/api/sessions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data: record }),
	});
	const data = await response.json();

	return { data: data.session };
}
