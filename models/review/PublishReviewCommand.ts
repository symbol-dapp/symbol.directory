import { Command } from '@symbol-dapp/core';
import { Address, NetworkType } from 'symbol-sdk';
import { ProjectJournalResolver } from '../project/ProjectJournalResolver';
import { Review, ReviewState } from './Review';

export class PublishReviewCommand extends Command<ReviewState> {
  public static TYPE = 'PublishReview';
  public static VERSION = 1;

  constructor (projectId: string, projectState: ReviewState, networkType: NetworkType, signer?: Address) {
    super(projectId, ProjectJournalResolver(networkType), PublishReviewCommand.TYPE, PublishReviewCommand.VERSION, projectState, signer);
  }

  public static of (projectId: string, reviewState: ReviewState, networkType: NetworkType): PublishReviewCommand {
    return new PublishReviewCommand(projectId, reviewState, networkType);
  }

  public create () {
    return new Review(this.data, this.signer!);
  }
}
