<template>
  <main>
    <!-- Page header -->
    <div
      class="max-w-3xl mx-auto md:flex md:items-start md:justify-between md:space-x-5 lg:max-w-7xl sm:px-0 px-6"
    >
      <div class="flex items-center space-x-5">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">
            {{ projectState.name }}
          </h1>
          <p class="text-sm font-medium text-gray-500">
            {{ projectState.shortDescription }}
          </p>
          <div class="flex items-center mt-4">
            <div v-if="showRating && projectState.rating !== undefined" class="flex items-center mr-4">
              <ul class="flex justify-center">
                <li v-for="rating in [1, 2, 3, 4, 5]" :key="rating">
                  <i :class="[projectState.rating >= rating ? 'fas' : 'far', 'fa-star fa-sm text-yellow-500 mr-1']" @click="reviewAs(rating)" />
                </li>
              </ul>
            </div>
            <ProjectSocialMedia :social-media="projectState.socialMedia" />
          </div>
        </div>
      </div>
      <div
        class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"
      >
        <NuxtLink :to="localePath({ path: `/project/${id}/manage`})" class="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
          Manage
        </NuxtLink>
        <a
          :href="projectState.website"
          target="__blank"
          class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
        >
          View Website
        </a>
      </div>
    </div>

    <div class="mt-8 max-w-3xl mx-auto lg:max-w-7xl">
      <div class="space-y-6 lg:col-start-1 lg:col-span-2">
        <!-- Description list-->
        <section aria-labelledby="applicant-information-title">
          <div class="bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h2
                id="applicant-information-title"
                class="text-lg leading-6 font-medium text-gray-900"
              >
                Project Information
              </h2>
            </div>
            <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">
                    Type
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ projectState.type }}
                  </dd>
                </div>
                <div class="sm:col-span-1">
                  <dt class="text-sm font-medium text-gray-500">
                    Category
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ projectState.category }}
                  </dd>
                </div>
                <div class="sm:col-span-2">
                  <dt class="text-sm font-medium text-gray-500">
                    About
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ projectState.longDescription }}
                    <p v-if="projectState.longDescription === ''" class="mt-1 text-sm text-gray-500">
                      No about provided
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ProjectDisplay',
  props: {
    id: {
      type: String,
      default: ''
    },
    projectState: {
      type: Object,
      default: () => {}
    },
    showRating: {
      type: Boolean,
      default: true
    },
    showControlButtons: {
      type: Boolean,
      default: false
    }
  }
});
</script>
