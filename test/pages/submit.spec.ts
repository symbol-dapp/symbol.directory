import { shallowMount } from "@vue/test-utils";

import Submit from "@/pages/submit.vue";
import BasicInfo from "@/components/Submit/BasicInfo.vue";
import MosaicInfo from "@/components/Submit/MosaicInfo.vue";
import SocialMedia from "@/components/Submit/SocialMedia.vue";

describe("submit page", () => {
  test("on data change updates state", async () => {
    const wrapper = shallowMount(Submit, {
      stubs: {
        SubmitBasicInfo: BasicInfo,
        SubmitMosaicInfo: MosaicInfo,
        SubmitSocialMedia: SocialMedia,
      }
    });
    const basicInfo = {
      name: "symbol.directory",
      website: "https://symbol.directory",
      type: "DAPP",
      category: "marketplace",
      shortDescription: "List all Symbol Projects",
      longDescription:
        "A project to find any project related to Symbol Blockchain"
    };
    const socialMedia = {
      github: "https://github.com/aleixmorgadas/symbol.directory",
      reddit: "https://www.reddit.com/r/nem/",
      telegram: "https://t.me/symbolfromnem",
      facebook: "https://www.facebook.com/ourNEM/",
      twitter: "https://twitter.com/nemtech"
    };
    const mosaicInfo = {
      mosaic: true,
      mosaicId: '2CF403E85507F39E'
    }

    wrapper.findComponent(BasicInfo).vm.$emit("basicInfo", basicInfo);
    wrapper.findComponent(MosaicInfo).vm.$emit("mosaicInfo", mosaicInfo);
    wrapper.findComponent(SocialMedia).vm.$emit("socialMedia", socialMedia);

    expect(wrapper.vm.$data.basicInfo).toBe(basicInfo);
    expect(wrapper.vm.$data.socialMedia).toBe(socialMedia);
    expect(wrapper.vm.$data.mosaicInfo).toBe(mosaicInfo);
  });
});
