import { PlainCommand } from '@symbol-dapp/core';
import { Address } from 'symbol-sdk';
import { ProjectJournalResolver } from '../project/ProjectJournalResolver';
import { Review, ReviewState } from './Review';

export class PublishReviewCommand extends PlainCommand<ReviewState> {
  public static TYPE = 'PublishReview';
  public static VERSION = 1;

  constructor (projectId: string, projectState: ReviewState, signer?: Address) {
    super(projectId, ProjectJournalResolver(), PublishReviewCommand.TYPE, PublishReviewCommand.VERSION, projectState, signer);
  }

  public static of (projectId: string, reviewState: ReviewState): PublishReviewCommand {
    return new PublishReviewCommand(projectId, reviewState);
  }

  public create () {
    return new Review(this.data, this.signer!);
  }
}
