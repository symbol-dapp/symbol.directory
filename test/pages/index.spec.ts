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
import Index from '@/pages/index.vue';
import { createLocalVue } from '@vue/test-utils';
import { render } from '@testing-library/vue';
import Vuex, { Store } from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('index page', () => {
  let store: Store<any>;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        projects: {
          state: {
            projects: []
          },
          namespaced: true
        }
      }
    });
  });

  test('mounts', () => {
    render(Index, {
      stubs: {
        Logo: true
      },
      localVue,
      store,
      mocks: {
        $t: () => {}
      }
    });
  });
});
