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
import { UserMetrics } from './getters';
import { TransactionMetric } from '~/models/metrics/TransactionMetrics';

export default {
  collectTransactionMetrics (state: any, metric: TransactionMetric) {
    state.transactionsProcessed += 1;
    state.totalFees += metric.fee;
    const user = state.users.find((user: UserMetrics) => user.address === metric.signer);
    if (user) {
      user.transactions += 1;
    } else {
      state.users.push({ address: metric.signer, transactions: 1 });
    }
  }
};
