<template>
  <!-- When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars -->
  <!-- Open: "fixed inset-0 z-40 overflow-y-auto", Closed: "" -->
  <header class="bg-white shadow-sm lg:static lg:overflow-y-visible">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8"
      >
        <div
          class="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2"
        >
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink :to="localePath('/')">
              <img
                class="block h-8 w-auto"
                src="/images/symbol.directory.logo.small.png"
                alt="symbol.directory logo"
              >
              <span />
            </NuxtLink>
          </div>
        </div>
        <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-7">
          <div
            class="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0"
          >
            <div class="w-full">
              <label for="search" class="sr-only">{{ $t('search') }}</label>
              <div class="relative">
                <div
                  class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"
                >
                  <!-- Heroicon name: solid/search -->
                  <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  v-model="searchText"
                  name="search"
                  class="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  :placeholder="$t('search')"
                  type="search"
                  @keyup.enter="search"
                >
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden"
        >
          <!-- Mobile menu button -->
          <NuxtLink :to="localePath('/submit')">
            <button
              type="button"
              class="-mx-2 rounded-md p-2 inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-100 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              +
            </button>
          </NuxtLink>
        </div>
        <div
          class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-3"
        >
          <NuxtLink
            :to="localePath('/submit')"
            class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          >
            {{ $t('submit') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data () {
    return {
      searchText: ''
    };
  },
  methods: {
    search () {
      if (this.$route.path !== '') {
        this.$router.push(this.localePath('/'));
        setTimeout(() => {
          this.$root.$emit('search', this.searchText);
        }, 100);
      }
    }
  }
});
</script>
