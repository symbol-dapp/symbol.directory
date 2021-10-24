<template>
  <div class="py-4">
    <div class="flex flex-col">
      <div class="flex flex-wrap md:justify-center mb-4">
        <button
          v-for="type in types"
          :key="type"
          :class="[selectedType === type ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-white hover:bg-gray-50', 'mx-2 mt-1 inline-flex items-center justify-center px-2 py-1 md:px-4 md:py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500']"
          @click="filterByType(type)">
          {{ $t(`types.${type.toLowerCase()}`) }}
        </button>
      </div>
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="
              shadow
              overflow-hidden
              border-b border-gray-200
              sm:rounded-lg
            "
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    {{ $t('name') }}
                  </th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    {{ $t('type') }}
                  </th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    {{ $t('category') }}
                  </th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    {{ $t('description') }}
                  </th>
                  <th
                    scope="col"
                    class="
                      px-6
                      py-3
                      text-left text-xs
                      font-medium
                      text-gray-500
                      uppercase
                      tracking-wider
                    "
                  >
                    {{ $t('rating') }}
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="project in projects"
                  :key="project.state.name"
                  class="clickable"
                  @click="seeProject(project.state.name)"
                >
                  <td
                    class="
                      px-6
                      py-4
                      whitespace-nowrap
                      text-sm
                      font-medium
                      text-gray-900
                    "
                  >
                    {{ project.state.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ $t(`types.${project.state.type.toLowerCase()}`) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ $t(`categories.${project.state.category.toLowerCase()}`) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ project.state.shortDescription }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div v-if="project.state.rating !== undefined" class="flex items-center mr-4">
                      <ul class="flex justify-center">
                        <li v-for="rating in [1, 2, 3, 4, 5]" :key="rating">
                          <i :class="[project.state.rating >= rating ? 'fas' : 'far', 'fa-star fa-sm text-yellow-500 mr-1']" @click="reviewAs(rating)" />
                        </li>
                      </ul>
                    </div>
                    <span v-if="project.state.rating === undefined">{{ $t('notRated') }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Project from '~/models/project/Project';

export default Vue.extend({
  data () {
    return {
      searchText: '',
      selectedType: ''
    };
  },
  computed: {
    projects () {
      return this.$store.state.projects.projects
        .filter((project: Project) => this.searchText === '' || project.state.name.toLowerCase().includes(this.searchText.toLowerCase()))
        .filter((project: Project) => this.selectedType === '' || project.state.type.toLowerCase() === this.selectedType.toLowerCase());
    },
    types () {
      return ['Application', 'Company', 'Dapp', 'DeFi', 'NFT', 'Node', 'Protocol', 'Education', 'Tools', 'Wallet', 'Team'];
    }
  },
  mounted () {
    this.$root.$on('search', (text: string) => {
      this.searchText = text;
    });
  },
  methods: {
    seeProject (name: string) {
      this.$router.push(this.localePath(`/project/${name}`));
    },
    filterByType (type: string) {
      this.selectedType = this.selectedType === type ? '' : type;
    }
  }
});
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
