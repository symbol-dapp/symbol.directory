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

import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import Display from '@/components/Project/Display.vue';
import { ProjectState } from '~/models/project/Project';
import Review from '~/pages/submit/review.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('submit page', () => {
  let getters;
  let store: Store<any>;

  beforeEach(() => {
    const projectState: ProjectState = {
      name: 'Symbol Dapp',
      category: 'Framework',
      type: 'Dapp',
      shortDescription: 'Symbol Dapp Framework',
      longDescription: 'Opinionated Symbol Dapp Framework',
      website: 'https://symboldapp.com',
      socialMedia: {
        twitter: undefined,
        github: undefined,
        facebook: undefined,
        reddit: undefined,
        telegram: undefined
      }
    };
    getters = {
      projectStateForm: () => projectState
    };
    const state = {
      basicInfo: {}
    };

    store = new Vuex.Store({
      modules: {
        submit: {
          state,
          getters,
          namespaced: true
        }
      }
    });
  });

  test('on data change updates state', () => {
    const methods = {
      init: jest.fn()
    };
    const wrapper = shallowMount(Review, {
      store,
      localVue,
      methods,
      stubs: {
        ProjectDisplay: Display
      },
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    });

    const qrCode = wrapper.find('#qrCode');
    expect(qrCode.exists()).toBeTruthy();

    expect(methods.init).toBeCalled();
  });
});
