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

import { Address, NetworkType } from 'symbol-sdk';
import NetworkTypeResolver from '~/services/NetworkTypeResolver';

export const ProjectJournalResolver = (): Address => {
  if (NetworkTypeResolver() === NetworkType.TEST_NET) {
    return Address.createFromRawAddress('TADNEW-7KKX42-QGWPM3-LSZJDD-5USCHT-57BPMJ-T4A');
  }
  if (NetworkTypeResolver() === NetworkType.MAIN_NET) {
    return Address.createFromRawAddress('NASGZJ-NBEVXB-656M3C-2JSKYH-SM47EO-QQF4M5-25A');
  }
  throw new Error('Not implemented for this network');
};
