import { Address } from 'symbol-sdk';

export interface TransactionMetric {
  transactionHash: string;
  fee: number;
  signer: Address
}
