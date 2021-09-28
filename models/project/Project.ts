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

import { Address } from 'symbol-sdk';
import { Review } from '../review/Review';

export interface SocialMedia {
  twitter: string | undefined;
  facebook: string | undefined;
  reddit: string | undefined;
  telegram: string | undefined;
  github: string | undefined;
}

export interface ProjectState {
  name: string;
  website: string;
  shortDescription: string;
  type: string;
  category: string;
  longDescription: string;
  socialMedia: SocialMedia;
  rating: number | undefined;
  reviews: Array<Review>
}

const PROJECT_STATE_DEFAULTS = () => ({
  name: '',
  website: '',
  shortDescription: '',
  type: '',
  category: '',
  longDescription: '',
  socialMedia: {
    github: undefined,
    twitter: undefined,
    facebook: undefined,
    reddit: undefined,
    telegram: undefined
  },
  rating: undefined,
  reviews: []
});

export default class Project {
  constructor (public readonly state: ProjectState, public readonly owner: Address) {}

  public static create (projectState: ProjectState, signer: Address): Project {
    return new Project(Object.assign({}, PROJECT_STATE_DEFAULTS(), projectState), signer);
  }

  public addReview (review: Review) {
    if (this.state.reviews.some((rev: Review) => rev.state.content === review.state.content && rev.state.rate === review.state.rate)) {
      return;
    }
    this.state.reviews.push(review);
    this.state.rating = this.state.reviews.map(review => review.state.rate)
      .reduce((prev: number, next: number) => prev + next, 0) / this.state.reviews.length;
  }

  public updateSocialMedia (socialMedia: SocialMedia) {
    this.state.socialMedia = socialMedia;
  }
}
