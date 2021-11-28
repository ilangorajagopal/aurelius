import { VStack } from '@chakra-ui/react';
import ActivityCalendar from 'react-activity-calendar';
import { calculateActivityData, calculateData } from '../../lib/utils';

export default function Stats(props) {
	const { createdAt, goal, posts } = props;
	const data = calculateData(goal, posts);
	const activityData = calculateActivityData(createdAt, data);

	return (
		<VStack w='full' d='flex' alignItems='start' spacing={4}>
			{/*<Heading as='h2'>Writing Consistency</Heading>*/}
			<ActivityCalendar
				blockMargin={6}
				blockRadius={4}
				blockSize={14}
				color='#2cb67d'
				data={activityData}
				hideColorLegend={true}
				labels={{
					totalCount: `{{count}} words in {{year}} across ${posts?.length} posts`,
				}}
			/>
		</VStack>
	);
}
