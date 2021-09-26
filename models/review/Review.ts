import { Address } from 'symbol-sdk';

export interface ReviewState {
  rate: number,
  content: string
}

export class Review {
  constructor (
    public readonly state: ReviewState,
    public readonly author: Address) {
  }
}
