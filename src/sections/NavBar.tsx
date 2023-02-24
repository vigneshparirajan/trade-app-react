import { Navbar, Text } from '@mantine/core';

export const NavBar = ({
	hidden,
	setNavBar,
	openNavBar,
}: {
	hidden?: boolean;
	setNavBar: any;
	openNavBar: boolean;
}) => {
	return (
		<>
			{!hidden && (
				<Navbar
					p="md"
					hiddenBreakpoint="sm"
					hidden={!openNavBar}
					width={{ sm: 200, lg: 300 }}
				>
					<Text>Application navbar</Text>
				</Navbar>
			)}
		</>
	);
};
