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

import Project, { ProjectState, SocialMedia } from '../../models/project/Project';
import { ownerAddress } from '../objectmothers/AccountObjectMother';

describe('Project', () => {
  it('a project has a basic info', () => {
    const projectState: ProjectState = {
      name: 'Symbol Dapp',
      category: 'Framework',
      type: 'Dapp',
      shortDescription: 'Symbol Dapp Framework',
      longDescription: 'Opinionated Symbol Dapp Framework',
      website: 'https://symboldapp.com',
      socialMedia: {
        twitter: 'https://twitter.com/symboldapp',
        github: 'https://github.com/symboldapp',
        facebook: undefined,
        reddit: undefined,
        telegram: undefined
      },
      rating: undefined,
      reviews: []
    };

    const project = Project.create(projectState, ownerAddress.publicAccount);

    expect(project).toBeDefined();
    expect(project.owner).toStrictEqual(ownerAddress.publicAccount);
  });

  it('allows changing the socialMedia', () => {
    const projectState: ProjectState = {
      name: 'Symbol Dapp',
      category: 'Framework',
      type: 'Dapp',
      shortDescription: 'Symbol Dapp Framework',
      longDescription: 'Opinionated Symbol Dapp Framework',
      website: 'https://symboldapp.com',
      socialMedia: {
        twitter: undefined,
        github: undefined,
        facebook: undefined,
        reddit: undefined,
        telegram: undefined
      },
      rating: undefined,
      reviews: []
    };
    const project = Project.create(projectState, ownerAddress.publicAccount);
    const socialMedia: SocialMedia = {
      twitter: 'https://twiter.com/symboldapp',
      github: undefined,
      facebook: undefined,
      reddit: undefined,
      telegram: undefined
    };

    project.updateSocialMedia(socialMedia);

    expect(project.state.socialMedia).toStrictEqual(socialMedia);
  });
});
