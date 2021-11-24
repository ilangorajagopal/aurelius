import TurndownService from 'turndown';
import { nanoid } from 'nanoid';

export function downloadAsMarkdown(title, content) {
	const htmlContent = `<h1>${title}</h1>${content}`;
	const turndownService = new TurndownService({ headingStyle: 'atx' });
	const markdown = turndownService.turndown(htmlContent);
	const filename = title || `twa_untitled_post_${Date.now()}`;
	const a = document.createElement('a');
	const blob = new Blob([markdown]);
	a.href = URL.createObjectURL(blob);
	a.download = `${filename}.md`;
	a.click();
}

export async function fetcher(url, opts) {
	const res = await fetch(url, opts);
	if (!res.ok) {
		throw new Error('Error completing request');
	}

	return await res.json();
}

export async function savePostToDB(post, update, user) {
	if (post) {
		const response = await fetch(`/api/posts/${post.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ data: update }),
		});
		const data = await response.json();

		return { data: data.post };
	} else {
		const id = nanoid(32);
		const share_id = `${update.title.split(' ').join('-')}-${id}`;
		const record = { ...update, share_id, author_id: user.id };
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

export async function saveSessionToDB(update, user) {
	const record = { ...update, user_id: user.id };
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

export async function fetchUserProfile(userId) {
	const response = await fetch(`/api/profiles/${userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();

	return { user: data.user };
}

export async function saveUserProfile(user, update) {
	const response = await fetch(`/api/profiles/${user.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ data: update }),
	});
	const data = await response.json();

	return { data: data.user };
}
