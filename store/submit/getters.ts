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

import { ProjectState } from '~/models/project/Project';

export default {
  projectStateForm: (state: any): ProjectState => {
    return {
      name: state.basicInfo.name,
      website: state.basicInfo.website,
      category: state.basicInfo.category,
      type: state.basicInfo.type,
      longDescription: state.basicInfo.longDescription,
      shortDescription: state.basicInfo.shortDescription,
      socialMedia: state.socialMedia
    };
  }
};
