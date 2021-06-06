import { createLocalVue, mount } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';

import SubmitBasicInfo from '@/components/SubmitBasicInfo.vue';
import SubmitMosaicInfo from '~/components/SubmitMosaicInfo.vue';
import SubmitSocialMedia from '~/components/SubmitSocialMedia.vue';
import Submit from '~/pages/submit/index.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('submit page', () => {
  let state;
  let store: Store<any>;

  beforeEach(() => {
    state = {
      basicInfo: {},
      socialMedia: {},
      mosaicInfo: {}
    };

    store = new Vuex.Store({
      modules: {
        submit: {
          state,
          namespaced: true
        }
      }
    });
  });
  test('on data change updates state', () => {
    const $route = {
      query: {
        enabled: false
      }
    };
    const wrapper = mount(Submit, {
      store,
      localVue,
      stubs: {
        SubmitBasicInfo,
        SubmitMosaicInfo,
        SubmitSocialMedia
      },
      mocks: {
        $route
      }
    });
    const basicInfo = {
      name: 'symbol.directory',
      website: 'https://symbol.directory',
      type: 'DAPP',
      category: 'marketplace',
      shortDescription: 'List all Symbol Projects',
      longDescription:
        'A project to find any project related to Symbol Blockchain'
    };
    const socialMedia = {
      github: 'https://github.com/aleixmorgadas/symbol.directory',
      reddit: 'https://www.reddit.com/r/nem/',
      telegram: 'https://t.me/symbolfromnem',
      facebook: 'https://www.facebook.com/ourNEM/',
      twitter: 'https://twitter.com/nemtech'
    };
    const mosaicInfo = {
      mosaic: true,
      mosaicId: '2CF403E85507F39E'
    };

    wrapper.findComponent(SubmitBasicInfo).vm.$emit('basicInfo', basicInfo);
    wrapper.findComponent(SubmitMosaicInfo).vm.$emit('mosaicInfo', mosaicInfo);
    wrapper.findComponent(SubmitSocialMedia).vm.$emit('socialMedia', socialMedia);

    expect(wrapper.vm.$data.basicInfo).toBe(basicInfo);
    expect(wrapper.vm.$data.socialMedia).toBe(socialMedia);
    expect(wrapper.vm.$data.mosaicInfo).toBe(mosaicInfo);
  });
});
