import { Aside, MediaQuery, Text } from '@mantine/core';

export const AsideBar = ({ hidden }: { hidden?: boolean }) => {
	return (
		<>
			{!hidden && (
				<MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
					<Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
						<Text>Application sidebar</Text>
					</Aside>
				</MediaQuery>
			)}
		</>
	);
};
