<template>
  <div class="py-4">
    <ProjectDisplay :project-state="project.state" :show-control-buttons="true" />
    <ProjectReviews :reviews="project.state.reviews" :project-id="project.state.name" />
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
      slug: undefined
    };
  },
  computed: {
    project () {
      return this.$store.state.projects.projects.find((project: Project) => project.id === this.slug);
    }
  }
});
</script>
