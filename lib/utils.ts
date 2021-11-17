import { supabase } from './supabase';

export async function savePostToDB(post, update) {
	if (post) {
		const { data, error } = await supabase
			.from('posts')
			.update(update)
			.match({ id: post.id });

		return { data: data[0], error };
	} else {
		const user = supabase.auth.user();
		const record = { ...update, user_id: user.id };
		const { data, error } = await supabase.from('posts').insert([record]);

		return { data: data[0], error };
	}
}

export async function saveSessionToDB(update) {
	const user = supabase.auth.user();
	const record = { ...update, user_id: user.id };
	await supabase.from('sessions').insert([record]);
}
