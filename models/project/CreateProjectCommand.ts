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

import { Command } from '@symbol-dapp/core';
import { Address, NetworkType } from 'symbol-sdk';
import Project, { ProjectState } from './Project';
import { ProjectJournalResolver } from './ProjectJournalResolver';

export class CreateProjectCommand extends Command<ProjectState> {
    public static TYPE = 'CreateProject';
    public static VERSION = 1;

    constructor (projectState: ProjectState, networkType: NetworkType, signer?: Address) {
      super(projectState.name, ProjectJournalResolver(networkType), CreateProjectCommand.TYPE, CreateProjectCommand.VERSION, projectState, signer);
    }

    public static of (projectState: ProjectState, networkType: NetworkType): CreateProjectCommand {
      return new CreateProjectCommand(projectState, networkType);
    }

    public create () {
      return new Project(this.data, this.signer!);
    }
}
