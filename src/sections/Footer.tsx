import {
	Button,
	Footer,
	Group,
	Stack,
	Divider,
	Title,
	Badge,
} from '@mantine/core';
import { useSetState, randomId } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconCoinRupee, IconReceiptTax, IconX } from '@tabler/icons';
import { useEffect, useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';

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
			onTradeCalculation(lastSession);
			onStopLossCalculation(lastSession);
		} else if (config.investAmount > 0 && config.tradeAmount > 0) {
			onTradeInitialize(config.investAmount, config.tradeAmount);
		} else {
			onTradeInitialize(0, 0);
		}
	}, [config, sessions]);

	const onTradeInitialize = (investAmount: number, tradeAmount: number) => {
		setSession({
			investAmount,
			tradeAmount,
		});
		setStopLoss(false);
	};

	const onTradeCalculation = (lastSession: ISession) => {
		tradeSession.investAmount = lastSession.totalAmount;
		if (lastSession.tradeStatus === 'LOSS') {
			tradeSession.tradeAmount = lastSession.tradeAmount * 0.75 * 3;
		} else {
			tradeSession.tradeAmount =
				(lastSession.totalAmount * config.tradePercent) / 100;
		}
		setSession(tradeSession);
	};

	const onStopLossCalculation = (lastSession: ISession) => {
		if (
			tradeSession.tradeAmount > 1250 ||
			Math.round(tradeSession.tradeAmount) >=
				Math.round(tradeSession.investAmount) ||
			lastSession.totalAmount < config.investAmount * 0.2 ||
			lastSession.totalAmount > config.investAmount + config.investAmount * 0.75
		) {
			setStopLoss(true);
			tradeSession.tradeAmount = 0;
		} else {
			setStopLoss(false);
		}
	};

	const onTradeSession = (status: Status) => {
		if (session.investAmount > 0 && session.tradeAmount > 0) {
			session.id = randomId();
			session.tradeStatus = status;
			if (status === 'LOSS') {
				session.totalAmount = session.investAmount - session.tradeAmount;
			} else {
				session.totalAmount = session.investAmount + session.tradeAmount * 0.8;
			}
			setSessions.append(session);
		} else {
			showNotification({
				color: 'red',
				icon: <IconX />,
				title: 'Error',
				message: 'Investment and TradeAmount are not found!',
			});
		}
	};

	return (
		<Footer height={150} p="xs">
			<Stack align="center">
				<Group align="right">
					<Badge size="xl" radius="xl" color="yellow">
						TOTAL :{' '}
						{Math.round(
							config.totalAmount - config.investAmount + session.investAmount
						)}
					</Badge>
					<Badge size="xl" radius="xl" color="teal">
						<Countdown
							date={Date.now() + 300000}
							renderer={({ minutes, seconds }) => {
								return (
									<span>
										{zeroPad(minutes)}:{zeroPad(seconds)}
									</span>
								);
							}}
						/>
					</Badge>
				</Group>
				<Group>
					<IconCoinRupee />
					<Title order={3}>{Math.round(session.investAmount)}</Title>
					<Divider orientation="vertical" />
					<IconReceiptTax />
					<Title order={3}>{Math.round(session.tradeAmount)}</Title>
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
