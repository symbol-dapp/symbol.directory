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

import { MosaicCommand } from '@symbol-dapp/core';
import { Address, Mosaic, NamespaceId, NetworkType, UInt64 } from 'symbol-sdk';
import { ProjectJournalResolver } from './ProjectJournalResolver';

export default class PromoteProjectCommand extends MosaicCommand<string> {
    public static TYPE = 'PromoteProject';
    public static VERSION = 1;
    public static COST_PER_BLOCK = 0.001;

    constructor (projectId: string, mosaics: Mosaic[], networkType: NetworkType, signer?: Address) {
      super(projectId, ProjectJournalResolver(networkType), PromoteProjectCommand.TYPE, PromoteProjectCommand.VERSION, projectId, mosaics, signer);
    }

    public static of (projectId: string, blocks: number, networkType: NetworkType): PromoteProjectCommand {
      return new PromoteProjectCommand(projectId, [new Mosaic(new NamespaceId('symbol.xym'), UInt64.fromUint(blocks * this.COST_PER_BLOCK))], networkType);
    }
}
