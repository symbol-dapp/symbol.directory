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

import { ProjectJournalResolver } from '~/models/project/ProjectJournalResolver';

describe('ProjectJournalResolver', () => {
  test('TEST_NET', () => {
    process.env.PRODUCTION = 'false';
    const journal = ProjectJournalResolver();
    expect(journal.pretty()).toBe('TADNEW-7KKX42-QGWPM3-LSZJDD-5USCHT-57BPMJ-T4A');
  });

  test('MAIN_NET not available yet', () => {
    process.env.PRODUCTION = 'true';
    const journal = ProjectJournalResolver();
    expect(journal.pretty()).toBe('NASGZJ-NBEVXB-656M3C-2JSKYH-SM47EO-QQF4M5-25A');
  });
});
