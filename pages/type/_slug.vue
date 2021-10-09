<template>
  <div class="py-4">
    <header>
      <div class="max-w-7xl mx-auto mb-5">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
          Project List only {{ slug }}
        </h1>
      </div>
    </header>
    <div class="flex flex-col">
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
                    Rating
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
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div v-if="project.state.rating !== undefined" class="flex items-center mr-4">
                      <ul class="flex justify-center">
                        <li v-for="rating in [1, 2, 3, 4, 5]" :key="rating">
                          <i :class="[project.state.rating >= rating ? 'fas' : 'far', 'fa-star fa-sm text-yellow-500 mr-1']" @click="reviewAs(rating)" />
                        </li>
                      </ul>
                    </div>
                    <span v-if="project.state.rating === undefined">Not rated yet</span>
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
  asyncData ({ params }) {
    const slug = params.slug;
    return { slug };
  },
  data () {
    return {
      searchText: '',
      selectedType: '',
      slug: ''
    };
  },
  computed: {
    projects () {
      return this.$store.state.projects.projects
        .filter((project: Project) => this.searchText === '' || project.state.name.toLowerCase().includes(this.searchText.toLowerCase()))
        .filter((project: Project) => this.slug === '' || project.state.type.toLowerCase() === this.slug.toLowerCase());
    },
    types () {
      return ['Dapp', 'DeFi', 'NFT', 'Node', 'Protocol', 'Education', 'Tools', 'Wallet', 'Team'];
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
