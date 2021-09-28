// Copyright (C) 2021 Aleix Morgadas <aleix@symboldapp.com>
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
import { CommandDispatcher } from '@symbol-dapp/core';
import { RawCommand } from '@symbol-dapp/core/dist/lib/RawCommand';
import { TransactionSearchCriteria, TransactionGroup, Order, Transaction, TransactionType, Page } from 'symbol-sdk';
import { Commit, Dispatch } from 'vuex';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { CreateProjectCommand } from '~/models/project/CreateProjectCommand';
import { ProjectState } from '~/models/project/Project';
import { ProjectJournalResolver } from '~/models/project/ProjectJournalResolver';
import RemoveProjectCommand from '~/models/project/RemoveProjectCommand';
import { PublishReviewCommand } from '~/models/review/PublishReviewCommand';
import { ReviewState } from '~/models/review/Review';
import { HTTPRepositoryFactory } from '~/services/RepositoryFacade';
const transactionHttp = HTTPRepositoryFactory.createTransactionRepository();

const commandDispatcher = new CommandDispatcher();

const createProjectCommandHandler = (commit: Commit) => (command: RawCommand<ProjectState>) => {
  const createProjectCommand = new CreateProjectCommand(command.data, command.signer);
  commit('addProject', createProjectCommand.create());
};

const createPublishReviewCommandHandler = (commit: Commit) => (command: RawCommand<ReviewState>) => {
  const publishReviewCommand = new PublishReviewCommand(command.id, command.data, command.signer);
  commit('addReview', { id: command.id, review: publishReviewCommand.create() });
};

const removeProjectCommandHandler = (commit: Commit) => (command: RawCommand<string>) => {
  commit('removeProject', new RemoveProjectCommand(command.id, command.signer));
};

export default {
  fullSyncProjects ({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }) {
    commit('cleanProjects');
    commandDispatcher.register(CreateProjectCommand.TYPE, createProjectCommandHandler(commit));
    commandDispatcher.register(PublishReviewCommand.TYPE, createPublishReviewCommandHandler(commit));
    commandDispatcher.register(RemoveProjectCommand.TYPE, removeProjectCommandHandler(commit));

    const searchCriteria: TransactionSearchCriteria = {
      group: TransactionGroup.Confirmed,
      address: ProjectJournalResolver(),
      pageNumber: 1,
      pageSize: 100,
      order: Order.Asc
    };
    transactionHttp
      .search(searchCriteria)
      .pipe(
        concatMap((page: Page<Transaction>) => page.data),
        concatMap((transaction: Transaction) => {
          if (transaction.type === TransactionType.AGGREGATE_BONDED || transaction.type === TransactionType.AGGREGATE_COMPLETE) {
            return transactionHttp
              .getTransaction(transaction.transactionInfo?.hash!, TransactionGroup.Confirmed);
          } else {
            return of(transaction);
          }
        })
      )
      .subscribe((transaction: Transaction) => {
        if (commandDispatcher.dispatch(transaction)) {
          dispatch('metrics/collectMetric', transaction, { root: true });
        }
      }, err => console.error(err));
  },
  addProject (_: any, transaction: Transaction) {
    commandDispatcher.dispatch(transaction);
  },
  addReview (_: any, transaction: Transaction) {
    commandDispatcher.dispatch(transaction);
  },
  removeProject (_: any, transaction: Transaction) {
    commandDispatcher.dispatch(transaction);
  }
};
