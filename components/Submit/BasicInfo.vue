<template>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="md:col-span-1">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Basic Information
        </h3>
        <p class="mt-1 text-sm text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
    </div>
    <div class="mt-5 md:mt-0 md:col-span-2">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label for="name" class="block text-sm font-medium text-gray-700"
                >Project Name</label
              >
              <input
                required
                @input="change"
                v-model="name"
                data-testId="name"
                id="name"
                type="text"
                name="name"
                autocomplete="project-name"
                placeholder="Project Name"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
              />
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label for="name" class="block text-sm font-medium text-gray-700"
                >Website</label
              >
              <input
                required
                @input="change"
                v-model="website"
                data-testId="website"
                id="website"
                type="text"
                name="website"
                autocomplete="project-website"
                placeholder="A URL to visit your product's website"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
              />
            </div>
            <div class="col-span-6 sm:col-span-6">
              <label for="name" class="block text-sm font-medium text-gray-700"
                >Short Description</label
              >
              <input
                required
                @input="change"
                v-model="shortDescription"
                data-testId="shortDescription"
                id="shortDescription"
                type="text"
                name="shortDescription"
                autocomplete="project-description"
                placeholder="This is to provide an idea of what does your product do."
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
              />
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label for="type" class="block text-sm font-medium text-gray-700"
                >Type</label
              >
              <select
                required
                @input="change"
                v-model="type"
                data-testId="type"
                id="type"
                name="type"
                v-bind:class="{ 'text-gray-400': type == 'select-type' }"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option disabled value="select-type">Select Type</option>
                <option value="DAPP">DAPP</option>
              </select>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="country"
                class="block text-sm font-medium text-gray-700"
                >Category</label
              >
              <select
                required
                @input="change"
                v-model="category"
                data-testId="category"
                id="category"
                name="category"
                v-bind:class="{ 'text-gray-400': category == 'select-type' }"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option disabled value="select-type">Select Type</option>
                <option value="media">Media</option>
                <option value="wallet">Wallet</option>
                <option value="price-tracker">Price Tracker</option>
                <option value="job-search">Job Search</option>
                <option value="game">Game</option>
                <option value="gambling">Gambling</option>
                <option value="finance">Finance</option>
                <option value="exchange">Exchange</option>
                <option value="social">Social</option>
                <option value="marketplace">Marketplace</option>
                <option value="utilities">Utilities</option>
                <option value="others">Others</option>
                <option value="high-risk">High Risk</option>
              </select>
            </div>
          </div>

          <div>
            <label for="about" class="block text-sm font-medium text-gray-700">
              Detail Description
            </label>
            <div class="mt-1">
              <textarea
                @input="change"
                v-model="longDescription"
                data-testId="longDescription"
                id="longDescription"
                name="longDescription"
                rows="3"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                placeholder="A detailed summary will better explain your products to the audiences. Our users will see this in your dedicated product page. "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: function() {
    return {
      name: "",
      website: "",
      type: "select-type",
      category: "select-type",
      shortDescription: "",
      longDescription: ""
    };
  },
  methods: {
    change() {
      this.$emit("basicInfo", this.$data);
    }
  }
});
</script>
