<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Social Media
            <span class="ml-2 text-gray-500 text-base">Optional</span>
          </h3>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <div class="shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <div class="relative rounded-md shadow-sm">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <img src="/images/twitter.svg" width="20" height="20">
                  </div>
                  <input
                    id="twitter"
                    v-model="twitter"
                    data-testid="twitter"
                    type="text"
                    name="twitter"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Add your product's Twitter URL"
                    @input="change"
                  >
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <div class="relative rounded-md shadow-sm">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <!-- Heroicon name: solid/mail -->
                    <img src="/images/reddit.svg" width="20" height="20">
                  </div>
                  <input
                    id="reddit"
                    v-model="reddit"
                    data-testid="reddit"
                    type="text"
                    name="reddit"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Add your product's Reddit URL"
                    @input="change"
                  >
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <div class="relative rounded-md shadow-sm">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <!-- Heroicon name: solid/mail -->
                    <img src="/images/facebook.svg" width="20" height="20">
                  </div>
                  <input
                    id="facebook"
                    v-model="facebook"
                    data-testid="facebook"
                    type="text"
                    name="facebook"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Add your product's Facebook URL"
                    @input="change"
                  >
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <div class="relative rounded-md shadow-sm">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <!-- Heroicon name: solid/mail -->
                    <img src="/images/telegram.svg" width="20" height="20">
                  </div>
                  <input
                    id="telegram"
                    v-model="telegram"
                    data-testid="telegram"
                    type="text"
                    name="telegram"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Add your product's Telegram URL"
                    @input="change"
                  >
                </div>
              </div>
              <div class="col-span-6 sm:col-span-3">
                <div class="relative rounded-md shadow-sm">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <!-- Heroicon name: solid/mail -->
                    <img src="/images/github.svg" width="20" height="20">
                  </div>
                  <input
                    id="github"
                    v-model="github"
                    data-testid="github"
                    type="text"
                    name="github"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Add your product's GitHub URL"
                    @input="change"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SubmitSocialMedia',
  data () {
    return {
      github: '',
      twitter: '',
      telegram: '',
      reddit: '',
      facebook: ''
    };
  },
  created () {
    if (this.$store !== undefined && Object.keys(this.$store.state.submit.socialMedia).length !== 0) {
      this.github = this.$store.state.submit.socialMedia.github;
      this.twitter = this.$store.state.submit.socialMedia.twitter;
      this.telegram = this.$store.state.submit.socialMedia.telegram;
      this.reddit = this.$store.state.submit.socialMedia.reddit;
      this.facebook = this.$store.state.submit.socialMedia.facebook;
    }
  },
  methods: {
    change () {
      this.$emit('socialMedia', this.$data);
    }
  }
});
</script>
