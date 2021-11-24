import useSWR from 'swr';
import { fetcher } from './utils';

export function usePost(postId) {
	const { data, error } = useSWR(`/api/posts/${postId}`, fetcher);

	return {
		post: data?.post,
		isLoading: !data && !error,
		isError: error,
	};
}

export function usePosts(userId) {
	const { data, error } = useSWR(`/api/posts?userId=${userId}`, fetcher);

	return {
		posts: data?.posts,
		isLoading: !data && !error,
		isError: error,
	};
}
