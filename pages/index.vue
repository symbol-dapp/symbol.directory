<template>
  <div class="py-4">
    <header>
      <div class="max-w-7xl mx-auto">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
          Project List
        </h1>
      </div>
    </header>
    <ProjectDisplay v-for="project in projects" :key="project.state.name" :project-state="project.state" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    projects () {
      return this.$store.state.projects.projects;
    }
  }
});
</script>
