<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            {{ $t('submitForm.mosaicInfo') }}
          </h3>
          <p class="mt-1 text-sm text-gray-600" />
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <div class="shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 bg-white sm:p-6">
            <!-- This example requires Tailwind CSS v2.0+ -->
            <div class="flex items-center justify-between">
              <span id="availability-label" class="flex-grow flex flex-col">
                <span
                  class="text-sm font-medium text-gray-700"
                >{{ $t('submitForm.hasMosaic') }}</span>
              </span>
              <button
                data-testId="mosaic"
                type="button"
                :class="{
                  'bg-indigo-600': mosaic,
                  'bg-gray-200': !mosaic
                }"
                class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-pressed="false"
                aria-labelledby="availability-label"
                @click="mosaic = !mosaic"
              >
                <span
                  :class="{
                    'translate-x-5': mosaic,
                    'translate-x-0': !mosaic
                  }"
                  aria-hidden="true"
                  class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                />
              </button>
            </div>
            <div v-if="mosaic" class="grid grid-cols-6 gap-6 mt-5">
              <div class="col-span-6 sm:col-span-6">
                <label
                  for="mosaicId"
                  class="block text-sm font-medium text-gray-700"
                >{{ $t('submitForm.mosaciD')}}</label>
                <input
                  id="mosaicId"
                  v-model="mosaicId"
                  data-testId="mosaic-id"
                  type="text"
                  name="mosaicId"
                  :placeholder="$t('submitForm.mosaicIdPlaceholder')"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  @input="change"
                >
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
  name: 'SubmitMosaicInfo',
  data () {
    return {
      mosaic: false,
      mosaicId: ''
    };
  },
  methods: {
    change () {
      this.$emit('mosaicInfo', this.$data);
    }
  }
});
</script>
