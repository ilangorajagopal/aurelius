import TurndownService from 'turndown';
import { nanoid } from 'nanoid';
import { addDays, addYears, differenceInCalendarDays, format } from 'date-fns';

export function getGreeting(name) {
	const now = new Date();
	const hrs = now.getHours();

	if (hrs >= 3 && hrs < 6) return "Mornin' Sunshine!"; // REALLY early
	if (hrs >= 6 && hrs < 12)
		return name ? `Good morning, ${name}!` : 'Good morning!'; // After 6am
	if (hrs >= 12 && hrs < 17)
		return name ? `Good afternoon, ${name}!` : 'Good afternoon!'; // After 12pm
	if (hrs >= 17 && hrs < 22)
		return name ? `Good evening, ${name}!` : 'Good evening!'; // After 5pm
	if (hrs >= 22 || hrs < 3)
		return name ? `Go to bed, ${name}!` : 'Go to bed!'; // After 10pm
}

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

export function calculateActivityData(createdAt, data) {
	if (createdAt) {
		const lastPostDate =
			data.length > 0 ? data[data.length - 1].date : null;
		const timestamp = new Date(createdAt);
		const fillerStartDate = lastPostDate
			? addDays(new Date(lastPostDate), 1)
			: new Date(createdAt);
		const end = addYears(timestamp, 1);
		const from = `${format(fillerStartDate, 'yyyy')}-${format(
			fillerStartDate,
			'MM'
		)}-${format(fillerStartDate, 'dd')}`;
		const to = `${format(end, 'yyyy')}-${format(end, 'MM')}-${format(
			end,
			'dd'
		)}`;
		const noOfDays = differenceInCalendarDays(new Date(to), new Date(from));
		const filler = [];
		for (let index = 0; index < noOfDays; index++) {
			const newDate = addDays(new Date(from), index);
			const date = `${format(newDate, 'yyyy')}-${format(
				newDate,
				'MM'
			)}-${format(newDate, 'dd')}`;
			filler.push({
				date,
				count: 0,
				level: 0,
			});
		}

		return [...data, ...filler];
	} else {
		return [];
	}
}

export function calculateData(goal, posts) {
	const data = posts?.map((post) => {
		const date = `${format(new Date(post?.created_at), 'yyyy')}-${format(
			new Date(post?.created_at),
			'MM'
		)}-${format(new Date(post?.created_at), 'dd')}`;
		const count = post?.word_count;
		const level = Math.round((count / goal) * 4);

		return { date, count, level: level > 4 ? 4 : level };
	});

	return data?.reverse() || [];
}

export async function fetcher(url, opts) {
	const res = await fetch(url, opts);
	if (!res.ok) {
		throw new Error('Error completing request');
	}

	return await res.json();
}

export async function savePostToDB(post, update, userId) {
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
		const shareId = `${update.title.split(' ').join('-')}-${id}`;
		const record = { ...update, shareId, userId };
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
	const record = { ...update, userId: user.id };
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
