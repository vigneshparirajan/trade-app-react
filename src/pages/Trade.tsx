import { Input, Grid, Divider, Container } from '@mantine/core';
import { IconCurrencyRupee, IconPercentage } from '@tabler/icons';
import { Session } from '../sections/Session';
import { ChangeEvent } from 'react';

export const Trade = ({
	config,
	setConfig,
	sessions,
	setSessions,
}: {
	config: IConfig;
	setConfig: any;
	setSessions: any;
	sessions: ISession[];
}) => {
	const onTotalAmount = (event: ChangeEvent<HTMLInputElement>) => {
		setConfig({
			totalAmount: Number(event.target.value),
			tradeAmount: (config.investAmount * config.tradePercent) / 10,
			investAmount: (config.totalAmount * config.investPercent) / 10,
		});
	};

	const onInvestPercent = (event: ChangeEvent<HTMLInputElement>) => {
		const percent = Number(event.target.value) / 100;
		setConfig({
			investPercent: Number(event.target.value),
			investAmount: config.totalAmount * percent,
		});
	};

	const onTradePercent = (event: ChangeEvent<HTMLInputElement>) => {
		const percent = Number(event.target.value) / 100;
		setConfig({
			tradePercent: Number(event.target.value),
			tradeAmount: config.investAmount * percent,
		});
	};

	const onInvestAmount = (event: ChangeEvent<HTMLInputElement>) => {
		setConfig({ investAmount: Number(event.target.value) });
	};

	return (
		<Container size="xs" px="xs">
			<Grid>
				<Grid.Col span={6}>
					<Input
						size="md"
						type="number"
						icon={<IconCurrencyRupee />}
						placeholder="TotalAmount"
						value={config.totalAmount > 0 ? config.totalAmount : ''}
						onChange={onTotalAmount}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<Input
						size="md"
						type="number"
						icon={<IconPercentage />}
						placeholder="InvestPercent"
						value={config.investPercent > 0 ? config.investPercent : ''}
						onChange={onInvestPercent}
					/>
				</Grid.Col>
			</Grid>
			<Grid>
				<Grid.Col span={6}>
					<Input
						size="md"
						type="number"
						icon={<IconCurrencyRupee />}
						placeholder="InvestAmount"
						value={config.investAmount > 0 ? config.investAmount : ''}
						onChange={onInvestAmount}
					/>
				</Grid.Col>
				<Grid.Col span={6}>
					<Input
						size="md"
						type="number"
						icon={<IconPercentage />}
						placeholder="TradePercent"
						value={config.tradePercent > 0 ? config.tradePercent : ''}
						onChange={onTradePercent}
					/>
				</Grid.Col>
			</Grid>
			<Divider
				my="xs"
				label={'Trades : ' + sessions.length}
				variant="dashed"
				labelPosition="center"
			/>
			{[...sessions].reverse().map((session) => {
				return (
					<Session
						key={session.id}
						session={session}
						sessions={sessions}
						setSessions={setSessions}
					/>
				);
			})}
		</Container>
	);
};
