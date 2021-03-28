import { mount, shallowMount } from "@vue/test-utils";

import Submit from "@/pages/submit.vue";
import BasicInfo from "@/components/Submit/BasicInfo.vue";
import SocialMedia from "@/components/Submit/SocialMedia.vue";


describe("submit page", () => {
  test("emits on data change", async () => {
    const wrapper = shallowMount(Submit, {
        stubs: {
            'SubmitBasicInfo': BasicInfo,
            'SubmitSocialMedia': SocialMedia,
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

    wrapper.findComponent(BasicInfo).vm.$emit('basicInfo', basicInfo);

    expect(wrapper.vm.$data.basicInfo).toBe(basicInfo);
  });
});
