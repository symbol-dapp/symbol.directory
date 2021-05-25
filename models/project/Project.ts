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

export interface SocialMedia {
  twitter: string | undefined;
  facebook: string | undefined;
  reddit: string | undefined;
  telegram: string | undefined;
  github: string | undefined;
}

export interface ProjectState {
  owner: Address;
  name: string;
  website: string;
  shortDescription: string;
  type: string;
  category: string;
  longDescription: string;
  socialMedia: SocialMedia;
}

export default class Project {
  constructor (public readonly state: ProjectState) {}

  public static create (projectState: ProjectState): Project {
    return new Project(projectState);
  }
}
