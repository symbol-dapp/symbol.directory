<template>
  <div class="py-4">
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
