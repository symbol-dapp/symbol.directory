import { RepositoryFactoryHttp } from 'symbol-sdk';

const nodeUrl = 'https://ngl-api-001.testnet.symboldev.network:3001';
export const HTTPRepositoryFactory = new RepositoryFactoryHttp(nodeUrl);
export const WSSRepositoryFactory = new RepositoryFactoryHttp(nodeUrl, {
  websocketUrl: 'wss://ngl-api-001.testnet.symboldev.network:3001/ws',
  websocketInjected: WebSocket
});
