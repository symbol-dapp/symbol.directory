<template>
  <div class="py-4">
    <header>
      <div class="max-w-7xl mx-auto mb-5">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
          Project List
        </h1>
      </div>
    </header>
    <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="project in projects" :key="project.state.name" class="clickable" @click="seeProject(project.state.name)">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
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
      searchText: ''
    };
  },
  computed: {
    projects () {
      if (this.searchText === '') {
        return this.$store.state.projects.projects;
      }
      return this.$store.state.projects.projects.filter((project: Project) => {
        if (project.state.name.toLowerCase().includes(this.searchText.toLowerCase())) {
          return true;
        }
        return false;
      });
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
    }
  }
});
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>