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
import { render, fireEvent } from '@testing-library/vue';
import SubmitMosaicInfo from '~/components/SubmitMosaicInfo.vue';

describe('SubmitMosaicInfo', () => {
  test('emits on data change', async () => {
    const { getByText, getByTestId, emitted } = render(SubmitMosaicInfo);

    getByText('Mosaic Information');

    const mosaicToggle = getByTestId('mosaic');
    await fireEvent.click(mosaicToggle);

    const mosaicInput = getByTestId('mosaic-id');

    await fireEvent.update(mosaicInput, '2CF403E85507F39E');

    expect(emitted().mosaicInfo).toBeTruthy();
    expect(emitted().mosaicInfo[0][0]).toStrictEqual({
      mosaic: true,
      mosaicId: '2CF403E85507F39E'
    });
  });
});
