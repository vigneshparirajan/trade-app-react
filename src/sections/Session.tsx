import { SimpleGrid, Title } from '@mantine/core';
import { IconCircleX } from '@tabler/icons';

export const Session = ({
	session,
	sessions,
	setSessions,
}: {
	session: ISession;
	sessions: ISession[];
	setSessions: any;
}) => {
	const onRemove = (id: string) => {
		const index = sessions.findIndex((session) => session.id === id);
		setSessions.remove(index);
	};

	return (
		<SimpleGrid
			cols={5}
			sx={(theme) => ({
				backgroundColor:
					theme.colorScheme === 'dark'
						? theme.colors.dark[6]
						: theme.colors.gray[0],
				textAlign: 'center',
				padding: theme.spacing.xs,
				borderRadius: theme.radius.md,
			})}
		>
			<div>
				<Title order={3}>{Math.round(session.investAmount)}</Title>
			</div>
			<div>
				<Title order={3}>{Math.round(session.tradeAmount)}</Title>
			</div>
			<div>
				<Title
					order={3}
					color={session.tradeStatus === 'LOSS' ? 'red' : 'green'}
				>
					{session.tradeStatus}
				</Title>
			</div>
			<div>
				<Title order={3}>{Math.round(session.totalAmount)}</Title>
			</div>
			<div style={{ marginTop: '5px' }}>
				<IconCircleX
					color="red"
					cursor={'pointer'}
					onClick={() => onRemove(session.id)}
				/>
			</div>
		</SimpleGrid>
	);
};
