import { NetworkType } from 'symbol-sdk';

const NetworkTypeResolver = () => {
  if (process.env.PRODUCTION === 'true') {
    return NetworkType.MAIN_NET;
  }
  return NetworkType.TEST_NET;
};

export default NetworkTypeResolver;
