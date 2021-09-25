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
import SubmitSocialMedia from '~/components/SubmitSocialMedia.vue';

describe('SubmitSocialMedia', () => {
  test('emits on data change', async () => {
    const { getByText, getByTestId, emitted } = render(SubmitSocialMedia);

    getByText('Social Media');

    const gitHubInput = getByTestId('github');
    const twitterInput = getByTestId('twitter');
    const facebookInput = getByTestId('facebook');
    const redditInput = getByTestId('reddit');
    const telegramInput = getByTestId('telegram');

    await fireEvent.update(
      gitHubInput,
      'https://github.com/aleixmorgadas/symbol.directory'
    );
    await fireEvent.update(twitterInput, 'https://twitter.com/nemtech');
    await fireEvent.update(facebookInput, 'https://www.facebook.com/ourNEM/');
    await fireEvent.update(redditInput, 'https://www.reddit.com/r/nem/');
    await fireEvent.update(telegramInput, 'https://t.me/symbolfromnem');

    expect(emitted().socialMedia).toBeTruthy();
    expect(emitted().socialMedia[0][0]).toStrictEqual({
      github: 'https://github.com/aleixmorgadas/symbol.directory',
      reddit: 'https://www.reddit.com/r/nem/',
      telegram: 'https://t.me/symbolfromnem',
      facebook: 'https://www.facebook.com/ourNEM/',
      twitter: 'https://twitter.com/nemtech'
    });
  });
});
