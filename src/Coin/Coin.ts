import { CoinSpecification } from './CoinSpecification';

export interface Coin {
  name: string;
  value: number;
  specification: CoinSpecification;
}
