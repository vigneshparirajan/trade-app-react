import {
	Button,
	Footer,
	Group,
	Stack,
	Divider,
	Title,
	Text,
} from '@mantine/core';
import { useSetState, randomId } from '@mantine/hooks';
import { IconCoinRupee, IconReceiptTax } from '@tabler/icons';
import { useEffect, useState } from 'react';

export const AppFooter = ({
	config,
	sessions,
	setSessions,
}: {
	config: IConfig;
	setSessions: any;
	sessions: ISession[];
}) => {
	// Initializing
	let tradeSession: ISession = {
		id: randomId(),
		tradeAmount: 0,
		investAmount: 0,
		tradePercent: 0,
		totalAmount: 0,
		tradeStatus: '',
	};
	const [isStopLoss, setStopLoss] = useState(false);
	const [session, setSession] = useSetState(tradeSession);

	useEffect(() => {
		if (sessions.length > 0) {
			const lastSession = sessions[sessions.length - 1];
			tradeSession.investAmount = lastSession.totalAmount;
			if (lastSession.tradeStatus === 'LOSS') {
				tradeSession.tradeAmount = lastSession.tradeAmount * 0.75 * 3;
			} else {
				tradeSession.tradeAmount =
					(lastSession.totalAmount * config.tradePercent) / 100;
			}
			if (
				tradeSession.tradeAmount > 1250 ||
				Math.round(tradeSession.tradeAmount) >=
					Math.round(tradeSession.investAmount) ||
				lastSession.totalAmount < config.investAmount * 0.2 ||
				lastSession.totalAmount >
					config.investAmount + config.investAmount * 0.5
			) {
				setStopLoss(true);
				tradeSession.tradeAmount = 0;
			} else {
				setStopLoss(false);
			}
			setSession(tradeSession);
		} else if (config.investAmount > 0 && config.tradeAmount > 0) {
			setSession({
				investAmount: config.investAmount,
				tradeAmount: config.tradeAmount,
			});
		} else {
			setStopLoss(false);
			setSession({
				investAmount: 0,
				tradeAmount: 0,
			});
		}
	}, [config, sessions]);

	const onTradeSession = (status: Status) => {
		session.id = randomId();
		session.tradeStatus = status;
		if (status === 'LOSS') {
			session.totalAmount = session.investAmount - session.tradeAmount;
		} else {
			session.totalAmount = session.investAmount + session.tradeAmount * 0.8;
		}
		setSessions.append(session);
	};

	return (
		<Footer height={150} p="md">
			<Text fw={800} align="center" color="yellow">
				TOTAL :{' '}
				{Math.round(
					config.totalAmount - config.investAmount + session.investAmount
				)}
			</Text>
			<Stack align="center" mt={5}>
				<Group>
					<IconCoinRupee />
					<Title order={2}>{Math.round(session.investAmount)}</Title>
					<Divider orientation="vertical" />
					<IconReceiptTax />
					<Title order={2}>{Math.round(session.tradeAmount)}</Title>
				</Group>
				{isStopLoss ? (
					<div style={{ width: 300 }}>
						<Button fullWidth color="red">
							STOP LOSS
						</Button>
					</div>
				) : (
					<Group>
						<div style={{ width: 150 }}>
							<Button
								fullWidth
								color="red"
								onClick={() => onTradeSession('LOSS')}
							>
								LOSS
							</Button>
						</div>
						<div style={{ width: 150 }}>
							<Button
								fullWidth
								color="green"
								onClick={() => onTradeSession('WIN')}
							>
								WIN
							</Button>
						</div>
					</Group>
				)}
			</Stack>
		</Footer>
	);
};
