import NextImage from 'next/image';
import { Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { ResponsiveCalendar } from '@nivo/calendar';

export default function Stats() {
	return (
		<VStack w='full' h={56} d='flex' alignItems='start' spacing={4}>
			<Heading as='h2'>Writing Consistency</Heading>
			<ResponsiveCalendar
				from='2021-01-01'
				to='2021-12-01'
				data={[
					{ day: '2021-11-01', value: 12 },
					{ day: '2021-11-22', value: 122 },
					{ day: '2021-11-30', value: 38 },
				]}
				emptyColor='#eeeeee'
				colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
				yearSpacing={40}
				daySpacing={4}
				legends={[
					{
						anchor: 'bottom-right',
						direction: 'row',
						translateY: 36,
						itemCount: 4,
						itemWidth: 42,
						itemHeight: 36,
						itemsSpacing: 14,
						itemDirection: 'right-to-left',
					},
				]}
			/>
		</VStack>
	);
}
