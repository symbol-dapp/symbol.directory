<template>
  <div class="py-4">
    <header>
      <div class="max-w-7xl mx-auto mb-5">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
          Project List (TEST_NET). Beta testing for some time
        </h1>
      </div>
    </header>
    <div class="flex flex-col">
      <div class="flex justify-center mb-4">
        <button
          v-for="type in types"
          :key="type"
          :class="[selectedType === type ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-white hover:bg-gray-50', 'mx-2 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500']"
          @click="filterByType(type)" >
          {{ type }}
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
                    Name
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
                    Type
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
                    Category
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
                    Description
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
                    {{ project.state.type }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ project.state.category }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ project.state.shortDescription }}
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
      if (this.searchText === '') {
        return this.$store.state.projects.projects;
      }
      if (this.selectedType !== '') {
        return this.$store.state.projects.projects.filter((project: Project) => {
          if (
            project.state.type
              .toLowerCase() === this.selectedType.toLowerCase()
          ) {
            return true;
          }
          return false;
        });
      }
      return this.$store.state.projects.projects.filter((project: Project) => {
        if (
          project.state.name
            .toLowerCase()
            .includes(this.searchText.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
    },
    types () {
      return ['Dapp', 'DeFi', 'NFT', 'Protocol', 'Education', 'Tools', 'Wallet', 'Team'];
    }
  },
  mounted () {
    this.$root.$on('search', (text: string) => {
      this.searchText = text;
    });
  },
  methods: {
    seeProject (name: string) {
      this.$router.push(`/project/${name}`);
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
