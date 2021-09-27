import { NetworkType, RepositoryFactoryHttp } from 'symbol-sdk';
import NetworkTypeResolver from './NetworkTypeResolver';

const nodeHttpsURLMainNet = 'https://xym.jp1.node.leywapool.com:3001';
const nodeWssURLMainNet = 'wss://xym.jp1.node.leywapool.com:3001/ws';

const nodeHttpsURLTestNet = 'https://ngl-api-001.testnet.symboldev.network:3001';
const nodeWssURLTestNet = 'wss://ngl-api-001.testnet.symboldev.network:3001/ws';

const nodeHttpURL = NetworkTypeResolver() === NetworkType.MAIN_NET ? nodeHttpsURLMainNet : nodeHttpsURLTestNet;
const nodeWssURL = NetworkTypeResolver() === NetworkType.MAIN_NET ? nodeWssURLMainNet : nodeWssURLTestNet;

export const HTTPRepositoryFactory = new RepositoryFactoryHttp(nodeHttpURL);
export const WSSRepositoryFactory = new RepositoryFactoryHttp(nodeHttpURL, {
  websocketUrl: nodeWssURL,
  websocketInjected: WebSocket
});
