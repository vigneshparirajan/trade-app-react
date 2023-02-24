import { Anchor, Header, SimpleGrid, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export const AppHeader = ({
	setAuth,
	setConfig,
	setSessions,
}: {
	setAuth: any;
	setConfig: any;
	setSessions: any;
}) => {
	const onClearAll = () => {
		setConfig({
			tradeAmount: 0,
			totalAmount: 0,
			investAmount: 0,
			tradePercent: 0,
			investPercent: 0,
		});
		setSessions.setState([]);
	};
	const matches = useMediaQuery('(min-width: 727px)');
	return (
		<Header height={{ base: 50, md: 70 }} p="md">
			<SimpleGrid cols={3}>
				<div>
					<Anchor onClick={() => setAuth(false)}>SignOut</Anchor>
				</div>
				<div>
					<Text fz="xl" align="center" mt={matches ? 0 : -5}>
						Trader App
					</Text>
				</div>
				<div>
					<Anchor style={{ float: 'right' }} onClick={onClearAll}>
						ClearAll
					</Anchor>
				</div>
			</SimpleGrid>
		</Header>
	);
};
