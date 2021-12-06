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

import { PlainCommand } from '@symbol-dapp/core';
import { PublicAccount } from 'symbol-sdk';
import Project, { ProjectState } from './Project';
import { ProjectJournalResolver } from './ProjectJournalResolver';

export class CreateProjectCommand extends PlainCommand<ProjectState> {
    public static TYPE = 'CreateProject';
    public static VERSION = 1;

    constructor (projectState: ProjectState, signer?: PublicAccount) {
      const name = projectState.name.replaceAll('/', '-');
      super(name, ProjectJournalResolver(), CreateProjectCommand.TYPE, CreateProjectCommand.VERSION, projectState, signer);
    }

    public static of (projectState: ProjectState): CreateProjectCommand {
      return new CreateProjectCommand(projectState);
    }

    public create () {
      return Project.create(this.id, this.data, this.signer!);
    }
}
