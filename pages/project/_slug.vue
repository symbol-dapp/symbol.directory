<template>
  <div class="py-4">
    <ProjectDisplay :project-state="project.state" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  async asyncData({ params }) {
    const slug = params.slug;
    return { slug };
  },
  computed: {
    project () {
      return this.$store.state.projects.projects.find(project => project.state.name == this.slug);
    }
  }
});
</script>
