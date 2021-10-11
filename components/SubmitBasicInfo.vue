<template>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="md:col-span-1">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          {{ $t('submitForm.projectInfo') }}
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
              >{{ $t('name') }}</label>
              <input
                id="name"
                v-model="name"
                required
                data-testId="name"
                type="text"
                name="name"
                autocomplete="project-name"
                :placeholder="$t('name')"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                @input="change"
              >
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="name"
                class="block text-sm font-medium text-gray-700"
              >{{ $t('website') }}</label>
              <input
                id="website"
                v-model="website"
                required
                data-testId="website"
                type="text"
                name="website"
                autocomplete="project-website"
                :placeholder="$t('submitForm.websitePlaceholder')"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                @input="change"
              >
            </div>
            <div class="col-span-6 sm:col-span-6">
              <label
                for="name"
                class="block text-sm font-medium text-gray-700"
              >{{ $t('submitForm.shortDescription') }}</label>
              <input
                id="shortDescription"
                v-model="shortDescription"
                required
                data-testId="shortDescription"
                type="text"
                name="shortDescription"
                autocomplete="project-description"
                :placeholder="$t('submitForm.shortDescriptionPlaceholder')"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                @input="change"
              >
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="type"
                class="block text-sm font-medium text-gray-700"
              >{{ $t('type') }}</label>
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
                  {{ $t('submitForm.selectType') }}
                </option>
                <option value="Application">
                  {{ $t('types.application') }}
                </option>
                <option value="Company">
                  {{ $t('types.company') }}
                </option>
                <option value="Dapp">
                  {{ $t('types.dapp') }}
                </option>
                <option value="DeFi">
                  {{ $t('types.defi') }}
                </option>
                <option value="NFT">
                  {{ $t('types.nft') }}
                </option>
                <option value="Node">
                  {{ $t('types.node') }}
                </option>
                <option value="Protocol">
                  {{ $t('types.protocol') }}
                </option>
                <option value="Education">
                  {{ $t('types.education') }}
                </option>
                <option value="Tools">
                  {{ $t('types.tools') }}
                </option>
                <option value="Wallet">
                  {{ $t('types.wallet') }}
                </option>
                <option value="Team">
                  {{ $t('types.team') }}
                </option>
              </select>
            </div>
            <div class="col-span-6 sm:col-span-3">
              <label
                for="country"
                class="block text-sm font-medium text-gray-700"
              >{{ $t('category') }}</label>
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
                  {{ $t('submitForm.selectCategory') }}
                </option>
                <option value="media">
                  {{ $t('categories.media') }}
                </option>
                <option value="wallet">
                  {{ $t('categories.wallet') }}
                </option>
                <option value="price-tracker">
                  {{ $t('categories.priceTracker') }}
                </option>
                <option value="job-search">
                  {{ $t('categories.jobSearch') }}
                </option>
                <option value="game">
                  {{ $t('categories.game') }}
                </option>
                <option value="gambling">
                  {{ $t('categories.gambling') }}
                </option>
                <option value="finance">
                  {{ $t('categories.finance') }}
                </option>
                <option value="exchange">
                  {{ $t('categories.exchange') }}
                </option>
                <option value="social">
                  {{ $t('categories.social') }}
                </option>
                <option value="marketplace">
                  {{ $t('categories.marketplace') }}
                </option>
                <option value="utilities">
                  {{ $t('categories.utilites') }}
                </option>
                <option value="others">
                  {{ $t('categories.others') }}
                </option>
                <option value="high-risk">
                  {{ $t('categories.highRisk') }}
                </option>
              </select>
            </div>
          </div>

          <div>
            <label for="about" class="block text-sm font-medium text-gray-700">
              {{ $t('submitForm.detailDescription') }}
            </label>
            <div class="mt-1">
              <textarea
                id="longDescription"
                v-model="longDescription"
                data-testId="longDescription"
                name="longDescription"
                rows="3"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
                :placeholder="$t('submitForm.detailDescriptionPlaceholder')"
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
