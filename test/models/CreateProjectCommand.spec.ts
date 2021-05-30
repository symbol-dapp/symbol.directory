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

import { NetworkType } from 'symbol-sdk';
import { CreateProjectCommand } from '~/models/project/CreateProjectCommand';
import { ProjectState } from '~/models/project/Project';

describe('CreateProjectCommand', () => {
  test('Required fields only', () => {
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
      }
    };

    const command = new CreateProjectCommand(projectState, NetworkType.TEST_NET);

    expect(command.id).toBe('Symbol Dapp');
    expect(command.journal.pretty()).toBe('TC65NA-IQ5NCF-BQPXUF-U6FGSS-RY2VDV-XGO7VY-M2A');
    expect(command.version).toBe(1);
    expect(command.type).toBe('CreateProject');
    expect(command.data).toBe(projectState);
  });
});
