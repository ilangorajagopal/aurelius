import { supabase } from './supabase';

export async function savePostToDB(post, update) {
	if (post) {
		// update existing record with latest content
		const { data, error } = await supabase
			.from('posts')
			.update(update)
			.match({ id: post.id });

		return { data: data[0], error };
	} else {
		// insert latest content as a new draft changelog
		const user = supabase.auth.user();
		const record = { ...update, user_id: user.id };
		const { data, error } = await supabase.from('posts').insert([record]);

		return { data: data[0], error };
	}
}
