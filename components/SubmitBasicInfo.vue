<template>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="md:col-span-1">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Project Information
        </h3>
      </div>
    </div>
    <div class="mt-5 md:mt-0 md:col-span-2">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label
                for="name"
                class="block text-sm font-medium text-gray-700"
              >Project Name</label>
              <input
                id="name"
                v-model="name"
                required
                data-testId="name"
                type="text"
                name="name"
                autocomplete="project-name"
                placeholder="Project Name"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                @input="change"
              >
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="name"
                class="block text-sm font-medium text-gray-700"
              >Website</label>
              <input
                id="website"
                v-model="website"
                required
                data-testId="website"
                type="text"
                name="website"
                autocomplete="project-website"
                placeholder="A URL to visit your product's website"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                @input="change"
              >
            </div>
            <div class="col-span-6 sm:col-span-6">
              <label
                for="name"
                class="block text-sm font-medium text-gray-700"
              >Short Description</label>
              <input
                id="shortDescription"
                v-model="shortDescription"
                required
                data-testId="shortDescription"
                type="text"
                name="shortDescription"
                autocomplete="project-description"
                placeholder="This is to provide an idea of what does your product do."
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                @input="change"
              >
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="type"
                class="block text-sm font-medium text-gray-700"
              >Type</label>
              <select
                id="type"
                v-model="type"
                required
                data-testId="type"
                name="type"
                :class="{ 'text-gray-400': type == 'select-type' }"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                @input="change"
              >
                <option disabled value="select-type">
                  Select Type
                </option>
                <option value="Application">
                  Application
                </option>
                <option value="Dapp">
                  Dapp
                </option>
                <option value="DeFi">
                  DeFi
                </option>
                <option value="NFT">
                  NFT
                </option>
                <option value="Node">
                  Node
                </option>
                <option value="Protocol">
                  Protocol
                </option>
                <option value="Education">
                  Education
                </option>
                <option value="Tools">
                  Tools
                </option>
                <option value="Wallet">
                  Wallet
                </option>
                <option value="Team">
                  Team
                </option>
              </select>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="country"
                class="block text-sm font-medium text-gray-700"
              >Category</label>
              <select
                id="category"
                v-model="category"
                required
                data-testId="category"
                name="category"
                :class="{ 'text-gray-400': category == 'select-type' }"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                @input="change"
              >
                <option disabled value="select-type">
                  Select Type
                </option>
                <option value="media">
                  Media
                </option>
                <option value="wallet">
                  Wallet
                </option>
                <option value="price-tracker">
                  Price Tracker
                </option>
                <option value="job-search">
                  Job Search
                </option>
                <option value="game">
                  Game
                </option>
                <option value="gambling">
                  Gambling
                </option>
                <option value="finance">
                  Finance
                </option>
                <option value="exchange">
                  Exchange
                </option>
                <option value="social">
                  Social
                </option>
                <option value="marketplace">
                  Marketplace
                </option>
                <option value="utilities">
                  Utilities
                </option>
                <option value="others">
                  Others
                </option>
                <option value="high-risk">
                  High Risk
                </option>
              </select>
            </div>
          </div>

          <div>
            <label for="about" class="block text-sm font-medium text-gray-700">
              Detail Description
            </label>
            <div class="mt-1">
              <textarea
                id="longDescription"
                v-model="longDescription"
                data-testId="longDescription"
                name="longDescription"
                rows="3"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                placeholder="A detailed summary will better explain your products to the audiences. Our users will see this in your dedicated product page. "
                @input="change"
              />
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
  name: 'SubmitBasicInfo',
  data () {
    return {
      name: '',
      website: '',
      type: 'select-type',
      category: 'select-type',
      shortDescription: '',
      longDescription: ''
    };
  },
  created () {
    if (this.$store !== undefined && Object.keys(this.$store.state.submit.basicInfo).length !== 0) {
      this.name = this.$store.state.submit.basicInfo.name;
      this.website = this.$store.state.submit.basicInfo.website;
      this.type = this.$store.state.submit.basicInfo.type;
      this.category = this.$store.state.submit.basicInfo.category;
      this.shortDescription = this.$store.state.submit.basicInfo.shortDescription;
      this.longDescription = this.$store.state.submit.basicInfo.longDescription;
    }
  },
  methods: {
    change () {
      this.$emit('basicInfo', this.$data);
    }
  }
});
</script>
