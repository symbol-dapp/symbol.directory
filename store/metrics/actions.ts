import { BlockInfo, Transaction } from 'symbol-sdk';
import { Commit } from 'vuex';
import { HTTPRepositoryFactory } from '~/services/RepositoryFacade';

const blockRepository = HTTPRepositoryFactory.createBlockRepository();

export default {
  collectMetric ({ commit }: { commit: Commit}, transaction: Transaction) {
    blockRepository.getBlockByHeight(transaction.transactionInfo?.height!)
      .subscribe((blockInfo: BlockInfo) => commit('collectTransactionMetrics', {
        transactionHash: transaction.transactionInfo?.hash!,
        fee: (transaction.size * blockInfo.feeMultiplier) / 1000000
      }));
  }
};
