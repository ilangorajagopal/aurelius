import useSWR from 'swr';
import { fetcher } from './utils';

export function usePosts(userId) {
	const { data, error } = useSWR(`/api/posts?userId=${userId}`, fetcher);

	return {
		posts: data?.posts,
		isLoading: !data && !error,
		isError: error,
	};
}
