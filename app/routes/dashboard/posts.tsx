import type { FC } from 'react'
import { Link } from '@remix-run/react'
import { formatDistance } from 'date-fns'
import type { Post } from '~/models/post.server'
import { Button, PrimaryButton } from '@components/buttons'
import CopyToClipboard from '@components/copy-to-clipboard'
import DropdownMenu from '@components/dropdown'
import { DotsVerticalIcon, Pencil1Icon } from '@radix-ui/react-icons'

interface Props {
	posts: Post[]
}

export default function Posts(props: Props) {
	const { posts } = props

	return (
		<div className='flex h-full w-full flex-col items-center justify-start space-y-4'>
			<div className='flex w-full items-center justify-between'>
				<h2 className='text-3xl font-semibold text-white'>Posts</h2>
				<Link to='/app'>
					<PrimaryButton>Write</PrimaryButton>
				</Link>
			</div>
			<div className='flex w-full flex-col items-center justify-start divide-y divide-gray-700'>
				{posts.map((post) => {
					return <PostItem post={post} key={post.id} />
				})}
			</div>
		</div>
	)
}

interface PostItemProps {
	post: Post
}

const PostItem: FC<PostItemProps> = ({ post }) => {
	const postDropdownItems = [
		{
			icon: <Pencil1Icon />,
			label: 'Edit',
			link: `/posts/${post.id}/edit`,
			onSelect: (e: Event) => e.preventDefault(),
		},
	]
	const shareLink =
		typeof window !== 'undefined'
			? // @ts-ignore
			  `${window?.ENV?.NEXT_PUBLIC_URL}/posts/${post.id}`
			: ''

	return (
		<div className='grid w-full grid-cols-3 gap-2 py-8'>
			<div className='col-span-2 flex h-full w-full flex-col items-start justify-center space-y-4'>
				<Link to={`/posts/${post.id}/edit`}>
					<h3 className='text-xl font-medium text-white'>
						{post.title}
					</h3>
				</Link>
				<div className='flex items-center justify-start space-x-2'>
					<p className='flex items-center justify-center rounded-md bg-gray-700 px-2 py-1 text-xs text-white'>
						{post.published ? 'Published' : 'Draft'}
					</p>
					<span className='text-xs text-white'>
						{formatDistance(new Date(post.createdAt), new Date(), {
							addSuffix: true,
						})}
					</span>
				</div>
			</div>
			<div className='col-span-1 flex h-full w-full items-center justify-end'>
				<CopyToClipboard text={shareLink} />
				<DropdownMenu
					items={postDropdownItems}
					trigger={
						<Button bg='bg-transparent' padding='p-1'>
							<DotsVerticalIcon />
						</Button>
					}
				/>
			</div>
		</div>
	)
}
