/// <reference types="react-scripts" />

type Status = '' | 'WIN' | 'LOSS';

interface IConfig {
	tradeAmount: number;
	totalAmount: number;
	investPercent: number;
	investAmount: number;
	tradePercent: number;
}

interface ISession {
	id: string;
	tradeAmount: number;
	investAmount: number;
	tradePercent: number;
	totalAmount: number;
	tradeStatus: Status;
}
