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
	const matches = useMediaQuery('(min-width: 900px)');

	const onSignOut = () => {
		setAuth(false);
	};

	return (
		<Header height={{ base: 50, md: 70 }} p="md">
			<SimpleGrid cols={3} mt={matches ? 5 : -5}>
				<div>
					<Anchor onClick={onSignOut}>SignOut</Anchor>
				</div>
				<div>
					<Text fz="xl" align="center" mt={matches ? 0 : -5}>
						Trade App
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
