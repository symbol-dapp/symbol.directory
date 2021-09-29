// Copyright (C) 2021 Aleix Morgadas <aleix@symbol.dapp>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { BlockInfo, Transaction } from 'symbol-sdk';
import { Commit } from 'vuex';
import { HTTPRepositoryFactory } from '~/services/RepositoryFacade';

const blockRepository = HTTPRepositoryFactory.createBlockRepository();

export default {
  collectMetric ({ commit }: { commit: Commit}, transaction: Transaction) {
    blockRepository.getBlockByHeight(transaction.transactionInfo?.height!)
      .subscribe((blockInfo: BlockInfo) => commit('collectTransactionMetrics', {
        transactionHash: transaction.transactionInfo?.hash!,
        fee: (transaction.size * blockInfo.feeMultiplier) / 1000000,
        signer: transaction.signer!.address.pretty()
      }));
  }
};
