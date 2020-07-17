import { Coin } from './Coin';

export const acceptedCoins: Coin[] = [
  {
    name: 'nickel',
    value: 0.05,
    specification: {
      diameter: 21.21,
      thickness: 1.95,
      weight: 5
    }
  },
  {
    name: 'dime',
    value: 0.1,
    specification: {
      diameter: 17.91,
      thickness: 1.35,
      weight: 2.268
    }
  },
  {
    name: 'quarter',
    value: 0.25,
    specification: {
      diameter: 24.26,
      thickness: 1.75,
      weight: 5.670
    }
  }
];
