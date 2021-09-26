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
import { TransactionSearchCriteria, TransactionGroup, NetworkType, Order, Transaction } from 'symbol-sdk';
import { Commit } from 'vuex';
import { CreateProjectCommand } from '~/models/project/CreateProjectCommand';
import { ProjectState } from '~/models/project/Project';
import { ProjectJournalResolver } from '~/models/project/ProjectJournalResolver';
import { PublishReviewCommand } from '~/models/review/PublishReviewCommand';
import { ReviewState } from '~/models/review/Review';
import { HTTPRepositoryFactory } from '~/services/RepositoryFacade';
const transactionHttp = HTTPRepositoryFactory.createTransactionRepository();

const commandDispatcher = new CommandDispatcher();

const createProjectCommandHandler = (commit: Commit) => (command: RawCommand<ProjectState>) => {
  const createProjectCommand = new CreateProjectCommand(command.data, NetworkType.TEST_NET, command.signer);
  commit('addProject', createProjectCommand.create());
};

const createPublishReviewCommandHandler = (commit: Commit) => (command: RawCommand<ReviewState>) => {
  const publishReviewCommand = new PublishReviewCommand(command.id, command.data, NetworkType.TEST_NET, command.signer);
  commit('addReview', { id: command.id, review: publishReviewCommand.create() });
};

export default {
  fullSyncProjects ({ commit }: { commit: Commit }) {
    commit('cleanProjects');
    commandDispatcher.register(CreateProjectCommand.TYPE, createProjectCommandHandler(commit));
    commandDispatcher.register(PublishReviewCommand.TYPE, createPublishReviewCommandHandler(commit));
    const searchCriteria: TransactionSearchCriteria = {
      group: TransactionGroup.Confirmed,
      address: ProjectJournalResolver(NetworkType.TEST_NET),
      pageNumber: 1,
      pageSize: 100,
      order: Order.Asc
    };
    transactionHttp.search(searchCriteria).subscribe(
      (page) => {
        page.data.forEach(transaction => commandDispatcher.dispatch(transaction));
      },
      err => console.error(err)
    );
  },
  addProject (_: any, transaction: Transaction) {
    commandDispatcher.dispatch(transaction);
  },
  addReview (_: any, transaction: Transaction) {
    commandDispatcher.dispatch(transaction);
  }
};
