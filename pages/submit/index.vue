<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div>
        <div class="text-center">
          <h1 class="text-5xl mb-10">
            Submit your project
          </h1>
        </div>
        <SubmitBasicInfo @basicInfo="basicInfoChange" />
      </div>

      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200" />
        </div>
      </div>

      <SubmitMosaicInfo @mosaicInfo="mosaicInfoChange" />

      <div class="hidden sm:block" aria-hidden="true">
        <div class="py-5">
          <div class="border-t border-gray-200" />
        </div>
      </div>

      <SubmitSocialMedia @socialMedia="socialMediaChange" />

      <div class="text-right mt-5">
        <button
          type="submit"
          class="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continue
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data () {
    return {
      basicInfo: {},
      socialMedia: {},
      mosaicInfo: {},
      enabled: false
    };
  },
  created () {
    if (Object.keys(this.$store.state.submit.basicInfo).length !== 0) {
      this.basicInfo = this.$store.state.submit.basicInfo;
    }
    if (Object.keys(this.$store.state.submit.socialMedia).length !== 0) {
      this.socialMedia = this.$store.state.submit.socialMedia;
    }
    if (Object.keys(this.$store.state.submit.mosaicInfo).length !== 0) {
      this.mosaicInfo = this.$store.state.submit.mosaicInfo;
    }
  },
  methods: {
    basicInfoChange (data: any) {
      this.$data.basicInfo = data;
    },
    socialMediaChange (data: any) {
      this.$data.socialMedia = data;
    },
    mosaicInfoChange (data: any) {
      this.$data.mosaicInfo = data;
    },
    onSubmit (event: any) {
      event.preventDefault();
      (this as any).$ga.event('SubmitProject', 'ContinueButton', 'enabled', this.enabled);
      this.$store.commit('submit/storeProject', this.$data);
      this.$router.push('/submit/review');
    }
  }
});
</script>
