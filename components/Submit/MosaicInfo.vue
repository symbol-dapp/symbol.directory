<template>
  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Mosaic Information
          </h3>
          <p class="mt-1 text-sm text-gray-600" />
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <div class="shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 bg-white sm:p-6">
            <!-- This example requires Tailwind CSS v2.0+ -->
            <div class="flex items-center justify-between">
              <span class="flex-grow flex flex-col" id="availability-label">
                <span class="text-sm font-medium text-gray-700"
                  >Does this project use a mosaic?</span
                >
              </span>
              <button
                @click="mosaic = !mosaic"
                data-testId="mosaic"
                type="button"
                v-bind:class="{
                  'bg-indigo-600': mosaic,
                  'bg-gray-200': !mosaic
                }"
                class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-pressed="false"
                aria-labelledby="availability-label"
              >
                <span
                  v-bind:class="{
                    'translate-x-5': mosaic,
                    'translate-x-0': !mosaic
                  }"
                  aria-hidden="true"
                  class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                ></span>
              </button>
            </div>
            <div class="grid grid-cols-6 gap-6 mt-5" v-if="mosaic">
              <div class="col-span-6 sm:col-span-6">
                <label
                  for="mosaicId"
                  class="block text-sm font-medium text-gray-700"
                  >Mosaic ID</label
                >
                <input
                  @input="change"
                  v-model="mosaicId"
                  data-testId="mosaic-id"
                  id="mosaicId"
                  type="text"
                  name="mosaicId"
                  placeholder="Mosaic ID like 2CF403E85507F39E"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
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
  name: "SubmitMosaicInfo",
  data: function() {
    return {
      mosaic: false,
      mosaicId: ""
    };
  },
  methods: {
    change() {
      this.$emit("mosaicInfo", this.$data);
    }
  }
});
</script>
